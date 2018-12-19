import Big from "big.js";

import calculate from "./calculate";
import isNumber from "./isNumber";

export default function calculation(calState, buttonName) {
  if (buttonName === "AC") {
    return {
      total: null,
      nextVal: null,
      operation: null,
    };
  }

  if (isNumber(buttonName)) {
    if (buttonName === "0" && calState.nextVal === "0") {
      return {};
    }

    if (calState.operation) {
      if (calState.nextVal) {
        return { nextVal: calState.nextVal + buttonName };
      }
      return { nextVal: buttonName };
    }

    if (calState.nextVal) {
      return {
        nextVal: calState.nextVal + buttonName,
        total: null,
      };
    }
    return {
      nextVal: buttonName,
      total: null,
    };
  }

  if (buttonName === "Sqrt") {
    if (calState.operation && calState.nextVal) {
      const result = calculate(calState.total, calState.nextVal, calState.operation);
      return {
        total: Big(result)
          .sqrt()
          .toString(),
        nextVal: null,
        operation: null,
      };
    }
    if (calState.nextVal) {
      return {
        nextVal: Big(calState.nextVal)
          .sqrt()
          .toString(),
      };
    }
    return {};
  }

  if (buttonName === ".") {
    if (calState.nextVal) {
      if (calState.nextVal.includes(".")) {
        return {};
      }
      return { nextVal: calState.nextVal + "." };
    }
    return { nextVal: "0." };
  }

  if (buttonName === "=") {
    if (calState.nextVal && calState.operation) {
      return {
        total: calculate(calState.total, calState.nextVal, calState.operation),
        nextVal: null,
        operation: null,
      };
    } else {
      return {};
    }
  }

  if (buttonName === "+/-") {
    if (calState.nextVal) {
      return { nextVal: (-1 * parseFloat(calState.nextVal)).toString() };
    }
    if (calState.total) {
      return { total: (-1 * parseFloat(calState.total)).toString() };
    }
    return {};
  }

  if (calState.operation) {
    return {
      total: calculate(calState.total, calState.nextVal, calState.operation),
      nextVal: null,
      operation: buttonName,
    };
  }

  if (!calState.nextVal) {
    return { operation: buttonName };
  }

  return {
    total: calState.nextVal,
    nextVal: null,
    operation: buttonName,
  };
}