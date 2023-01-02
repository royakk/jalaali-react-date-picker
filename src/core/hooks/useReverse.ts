import { MutableRefObject, useCallback } from "react";
import { Placement } from "../../components/popup";
import { useWindowSize } from "./useWindowSize";

type ReverseConfig = {
  element: MutableRefObject<HTMLDivElement | null>;
  max: [number, number];
  placement: Placement;
};

type Config = {
  shouldVerticalReverse: boolean;
  shouldHorizontalReverse: boolean;
  top: number | undefined;
  left: number | undefined;
  right: number | undefined;
  bottom: number | undefined;
  animationClassName: string | undefined;
};

const DEFAULT_CONFIG: Config = {
  shouldVerticalReverse: false,
  shouldHorizontalReverse: false,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  animationClassName: undefined,
};

export const useReverse = ({ element, max, placement }: ReverseConfig) => {
  const { height, width } = useWindowSize();

  const config: () => Config = useCallback(() => {
    if (!element.current) return DEFAULT_CONFIG;

    const node = element.current;

    const bounds = node.getBoundingClientRect();

    if (bounds) {
      const gap = 8;
      const h = bounds.height;
      const w = bounds.width;
      const t = bounds.top;
      const l = bounds.left;
      const popupHeight = max[0];
      const popupWidth = max[1];
      const shouldVerticalReverse =
        gap + h + popupHeight > height
          ? false
          : placement === "bottom"
          ? height - (h + t) <= popupHeight
          : placement === "top"
          ? t <= popupHeight
          : false;

      const shouldHorizontalReverse =
        (placement === "left" && l + popupWidth >= width) ||
        (placement === "right" && l + w <= popupWidth)
          ? false
          : placement === "left"
          ? l <= popupWidth
          : placement === "right"
          ? width - (l + w) <= popupWidth
          : false;

      const { animationClassName } = generateAnimation({
        placement,
        shouldHorizontalReverse,
        shouldVerticalReverse,
      });

      if (placement === "bottom" || placement === "top") {
        if (t <= popupHeight && shouldVerticalReverse) {
          return {
            shouldVerticalReverse,
            shouldHorizontalReverse,
            top: h + gap,
            bottom: undefined,
            right: shouldHorizontalReverse ? 0 : undefined,
            left: shouldHorizontalReverse ? 0 : undefined,
            animationClassName,
          };
        }

        return {
          shouldVerticalReverse,
          shouldHorizontalReverse,
          bottom:
            placement === "bottom"
              ? shouldVerticalReverse
                ? h + gap
                : -(popupHeight + gap)
              : undefined,
          top:
            placement === "top"
              ? shouldVerticalReverse
                ? -(h + gap)
                : -(popupHeight + gap)
              : undefined,
          right: shouldHorizontalReverse ? undefined : 0,
          left: shouldHorizontalReverse ? 0 : undefined,
          animationClassName,
        };
      }

      return {
        shouldHorizontalReverse,
        shouldVerticalReverse,
        top: 0,
        left:
          placement === "left"
            ? shouldHorizontalReverse
              ? l + w
              : -(popupWidth + gap)
            : undefined,
        right:
          placement === "right"
            ? shouldHorizontalReverse
              ? w + gap
              : -(popupWidth + gap)
            : undefined,

        bottom: undefined,
        animationClassName,
      };
    }

    return DEFAULT_CONFIG;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, height, max, width]);

  return config;
};

const generateAnimation = ({
  placement,
  shouldHorizontalReverse,
  shouldVerticalReverse,
}: {
  placement: Placement;
  shouldVerticalReverse: boolean;
  shouldHorizontalReverse: boolean;
}) => {
  const below =
    (placement === "bottom" && !shouldVerticalReverse) ||
    (placement === "top" && shouldVerticalReverse) ||
    placement === "left" ||
    placement === "right";
  const isRight =
    (placement === "right" && !shouldHorizontalReverse) ||
    (placement === "left" && shouldHorizontalReverse);

  const animationClassName =
    placement === "top" || placement === "bottom"
      ? below
        ? "open-vert-bottom"
        : "open-vert-top"
      : placement === "right" || placement === "left"
      ? isRight
        ? "open-horz-right"
        : "open-horz-left"
      : undefined;

  return {
    animationClassName,
  };
};
