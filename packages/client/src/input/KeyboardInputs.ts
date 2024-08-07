import {
  fromEvent,
  Observable,
  map,
  distinctUntilChanged,
  tap,
  distinct,
  merge,
} from "rxjs";
import { actions } from "./Actions";
/**
 * Not currently in use... revisit later if desired
 * use "Input" for now
 */

const createKeyboardManager = (
  element: HTMLElement = document.documentElement,
) => {
  const pressedKeys: Set<string> = new Set();

  const keydown$: Observable<string> = fromEvent<KeyboardEvent>(
    element,
    "keydown",
  ).pipe(
    map((event) => event.key),
    // distinctUntilChanged()
  );

  const keyup$: Observable<string> = fromEvent<KeyboardEvent>(
    element,
    "keyup",
  ).pipe(
    map((event) => event.key),
    // distinctUntilChanged()
  );

  const activeKeys$ = merge(keydown$, keyup$).pipe(distinctUntilChanged());

  // TODO: merge keyDown and keyUp to prevent issues with "distinctUntilChanged"
  keydown$.subscribe((key) => onKeyDown(key));
  keyup$.subscribe((key) => onKeyUp(key));

  const onKeyDown = (key: string) => {
    pressedKeys.add(key);
    Object.values(actions).forEach(
      ({ keys, keyCombinations, condition, callback }) => {
        if (keys && keys.includes(key) && (!condition || condition())) {
          callback();
        }

        if (keyCombinations) {
          keyCombinations.forEach((combination) => {
            if (
              combination.every((key) => pressedKeys.has(key)) &&
              (!condition || condition())
            ) {
              callback();
            }
          });
        }
      },
    );
  };

  const onKeyUp = (key: string) => {
    pressedKeys.delete(key);
  };

  const isKeyPressed = (key: string): boolean => {
    return pressedKeys.has(key);
  };

  return {
    isKeyPressed,
  };
};

export { createKeyboardManager };
