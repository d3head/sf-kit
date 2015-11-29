import Trigger from './Trigger';
import { PagePositionCondition } from './Condition';
import { ClassAction, TouchSrcAction  } from './Action';

export default {
  Trigger,
  Condition: PagePositionCondition,
  PagePositionCondition,
  ClassAction,
  TouchSrcAction,
  Actions: {
    ClassAction: ClassAction,
    TouchSrcAction: TouchSrcAction,
  },
};
