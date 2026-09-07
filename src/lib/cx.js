/** Tiny class-name joiner, avoids pulling in clsx for a five-line utility. */
export function cx(...values) {
  return values.flat(Infinity).filter(Boolean).join(' ')
}

export default cx
