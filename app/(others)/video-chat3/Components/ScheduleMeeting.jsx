"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useSelector } from "react-redux";
import MeetingModal from "./MeetingModal";
import HomeCard from "./HomeCard";
import { getRawDate, handleRetrieveSlots, handleUpdateSlots } from "../sharedFunction";
import { fetchAvailableSlots, updateAvailableSlots } from "@/services/GenerateAllData";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils";
import Spinner from "@/components/Sppiner/Spinner";
const ScheduleMeeting = ({ consultant_id, consultant_name = "default", consultant_real_id = 0 }) => {
  const [meetingState, setMeetingState] = useState();
  const user_redux = useSelector((state) => state.user);
  const [user, setUser] = useState(undefined)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [slotLoading,setSlotLoading]=useState(false)
  useEffect(() => {
    setUser(user_redux)
  }, [user_redux])
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    datetime: new Date(),
    description: "",
    link: "",
    consultant_id: consultant_id
  });
  const [callDetails, setCallDetails] = useState();
  const { toast } = useToast()
  const createMeeting = async () => {
    if (!client || !user||!selectedSlot) return;
    try {
      if (!values.datetime) {
        toast({
          title: "Please select a date and time",
        });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to crate call");

      const startsAt =
        values.datetime.toISOString();
      const description = values.description;
      const consultant_id = values.consultant_id.toString()

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          members: [
            ...(description !== "Instant Meeting" ? [{ user_id: consultant_id, role: 'admin' }] : []),
            { user_id: user.user_id.toString(), role: 'guest' }
          ],
          custom: {
            description,
            isAccepted: true,
            consultant_name,
            talent_name: user.name,
            consultant_real_id
          },
        },
      });

      if (!call.id) {
        throw new Error('Failed to create meeting ID');
      }

      // updating availability slot of the consultant
      await updateAvailableSlots(values.consultant_id, getRawDate(values.datetime), values.datetime, "requested")
      setCallDetails(call);
      // if (!values.description) {
      //   router.push(`/video-chat3/meeting/${call.id}`);
      // }
      toast({
        title: "Meeting Created",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create Meeting",
      });
    }
  };

  // handling time slots i won't need it anymore
  const convertToTime = (timeString) => {
    const [time, modifier] = timeString.split(/(AM|PM)/i);
    let [hours, minutes] = time.split(':');
    if (modifier.toLowerCase() === 'pm' && hours !== '12') {
      hours = parseInt(hours, 10) + 12;
    }
    if (modifier.toLowerCase() === 'am' && hours === '12') {
      hours = 0;
    }
    return { hours: parseInt(hours, 10), minutes: parseInt(minutes, 10) };
  };

const convertTimeSlotsToDates = (date, timeSlots) => {
    return timeSlots.map(slot => {
      const { hours, minutes } = convertToTime(slot.split('-')[0]);
      const newDate = new Date(date);
      newDate.setHours(hours, minutes, 0, 0);
      return newDate;
    });
  };
  const [timeSlots, setTimeSlots] = useState([]);
  useEffect(() => {
    const fetchTimeSlots = async () => {
      setSlotLoading(true)
      setTimeSlots([])
      setSelectedSlot(null)
      const formattedDate = getRawDate(values.datetime)
      const slots = await fetchAvailableSlots(consultant_id, formattedDate, 'available');
      setSlotLoading(false)
      setTimeSlots(slots);
    };
    fetchTimeSlots();
  }, [values.datetime]);
  const includeTimes = convertTimeSlotsToDates(values.datetime, timeSlots);


  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/video-chat3/meeting/${callDetails?.id}`
  if (!user?.user_id) {
    return <div className="text-black">Loading...</div>; // Or any placeholder
  }
  const CustomDatePickerInput = React.forwardRef(({ value, onClick }, ref) => (
    <input
      className="w-full rounded  p-2"
      onClick={onClick}
      value={value}
      ref={ref}
      readOnly // Disable manual typing
    />
  ));
  const handleSlotSelection=(slot)=>{
    setSelectedSlot(slot)
    const {hours,minutes}=convertToTime(slot.split('-')[0])
    const date=values.datetime
    date.setHours(hours)
    date.setMinutes(minutes)
    date.setSeconds(0)
    setValues({ ...values, datetime: date })

  }
  return (
    <section className=''>
      <Button  onClick={() => setMeetingState("isScheduledMeeting")}>Schedule Meeting</Button>

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduledMeeting"}
          onClose={() => setMeetingState(undefined)}
          title='Create Meeting'
          handleClick={createMeeting}
          selectedSlot={selectedSlot}
        >

          <div className='flex flex-col gap-2 5'>
            <label className='text-base text-normal leading-[22px]' htmlFor=''>
              Add a description
            </label>
            <Textarea
              onChange={(e) => {
                setValues({ ...values, description: e.target.value });
              }}
              className=' border-none border border-blue-1'
            ></Textarea>
          </div>
          <div className='flex w-full flex-col gap-2.5'>
            <label className='text-base text-normal leading-[22px] ' htmlFor=''>
              Select Date and Time
            </label>
            {/* <DatePicker
              selected={values.datetime}
              onChange={(date) => setValues({...values,datetime:date})}
              showTimeSelect
              includeTimes={includeTimes}
              timeFormat='HH:mm'
              timeIntervals={60}
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm aa'
              className="w-full rounded p-2"
              minDate={new Date()}
              customInput={<CustomDatePickerInput />}
              disabled={loadingSlots}
            /> */}
            <div className="flex-grow mx-auto">
              <Calendar
                mode="single"
                selected={values.datetime}
                onSelect={(date) => setValues({ ...values, datetime: date })}
                className="rounded-md border w-full"
              />
            </div>

            <div className="mt-6">
              <h2 className="text-sm font-semibold mb-3">Available Slots</h2>
              {slotLoading?
              <Spinner></Spinner>:timeSlots.length?"":
              <span className="text-sm text-red-800">No Available Slot!</span>
              }
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot, index) => (
                  <span
                    key={index}
                    onClick={()=>handleSlotSelection(slot)}
                    className={cn(
                      "p-2 text-xs text-center rounded-md bg-green-50 hover:bg-green-100 transition-colors cursor-pointer",
                      selectedSlot === `${slot}` && "ring-2 ring-primary bg-green-300"
                    )}
                  >
                    {slot}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduledMeeting"}
          onClose={() => setMeetingState(undefined)}
          title='Meeting Created'
          className='text-center'
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link copied" });
          }}
          image='/icons/checked.svg'
          buttonIcon='/icons/copy.svg'
        ></MeetingModal>
      )}
    </section>
  );
};

export default ScheduleMeeting;
