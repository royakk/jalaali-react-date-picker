import { DatePicker } from "./components";
import { InputDatePicker } from "./components/dateInput";
import { RangePicker } from "./components/range";
import { InputRangePicker } from "./components/rangeInput";
import {
  DatePickerProps,
  InputDatePickerProps,
  InputRangePickerProps,
  RangePickerProps,
} from "./core";
import "./core/styles/index.css";

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement,
// );
// root.render(
//   <React.StrictMode>
//     <DatePicker />
//     <RangePicker />
//     <InputDatePicker />
//     <InputRangePicker />
//     <App />
//   </React.StrictMode>,
// );

export { DatePicker, RangePicker, InputDatePicker, InputRangePicker };
export type {
  DatePickerProps,
  RangePickerProps,
  InputDatePickerProps,
  InputRangePickerProps,
};
