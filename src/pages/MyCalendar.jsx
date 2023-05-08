import React, {useState} from 'react'
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop} from '@syncfusion/ej2-react-schedule';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { scheduleData } from '../data/dummy';
export default function MyCalendar() {
  const [scheduleObj, setScheduleObj] = useState();

  // const change = (args) => {
  //   scheduleObj.selectedDate = args.value;
  //   scheduleObj.dataBind();
  // };

  const onDragStart = (arg) => {
    // eslint-disable-next-line no-param-reassign
    // arg.navigation.enable = true;
  };


  return (
    <>
     <div className="head">
      <h4>Calender</h4>
      </div>
      <section>
      <div className="card scrollY">
      <ScheduleComponent
        height="calc(100vh - 170px)"
        ref={(schedule) => setScheduleObj(schedule)}
        selectedDate={new Date(2021, 0, 10)}
        eventSettings={{ dataSource: scheduleData }}
     
      >
        
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
      </div>
      </section>
    </>
    
  )
}
