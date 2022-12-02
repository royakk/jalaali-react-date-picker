import classNames from "classnames";
import { useState } from "react";
import calendar from "../../assets/icons/calendar.svg";
import { DateProvider, InputDatePickerProps } from "../../core";
import "../../styles/index.scss";
import Panel from "../date/panel";
import { Popup } from "../popup";

export const InputDatePicker = ({
  value,
  onChange,
  onDayChange,
  onMonthChange,
  onYearChange,
  format,
  locale,
  disabledDates,
  open,
  onOpenChange,
  pickerProps,
  disabled,
  suffixIcon,
  prefixIcon,
  placement = "bottom",
  className,
  wrapperClassName,
  wrapperStyle,
  ...rest
}: InputDatePickerProps) => {
  const [isOpen, setIsOpen] = useState<boolean | undefined>(open);
  const isRtl = (locale?.language || "fa") === "fa";

  const toggle = () => {
    if (disabled) return;

    setIsOpen((prev) => !prev);
    onOpenChange?.(isOpen === undefined ? false : isOpen);
    return true;
  };

  const close = () => {
    setIsOpen(false);
    onOpenChange?.(false);
  };

  return (
    <DateProvider
      props={{
        value,
        onChange,
        onMonthChange,
        onYearChange,
        format,
        disabledDates,
        locale,
        onDayChange,
      }}
    >
      {(inputProps) => (
        <Popup
          key="date-popup"
          mode="date"
          placement={placement}
          isOpen={isOpen}
          close={close}
          toggle={toggle}
          panel={<Panel {...pickerProps} />}
        >
          <div
            className={classNames(
              "picker-input-wrapper",
              isRtl && "rtl",
              wrapperClassName,
            )}
            style={wrapperStyle}
          >
            {prefixIcon && prefixIcon}
            <input
              {...rest}
              {...inputProps}
              className={classNames("picker-input", isRtl && "rtl", className)}
              readOnly
            />
            {suffixIcon || (
              <div className="calendar-icon">
                <img src={calendar} alt="calendar" width={20} height={20} />
              </div>
            )}
          </div>
        </Popup>
      )}
    </DateProvider>
  );
};
