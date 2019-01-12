import { useEffect, useRef } from 'react'

let guid = 0
export function useChain(refs, timeSteps, timeFrame = 1000) {
  const frames = useRef([])
  useEffect(() => {
    const local = ++guid
    refs.forEach(({ current }) => current && current.stop())
    if (timeSteps) {
      frames.current.forEach(clearTimeout)
      frames.current = []
      refs.forEach((ref, index) =>
        frames.current.push(
          setTimeout(() => ref.current.start(), timeFrame * timeSteps[index])
        )
      )
    } else {
      console.log('start refs')
      refs.reduce(
        (q, { current }) =>
          (q = q.then(() => guid === local && current && current.start())),
        Promise.resolve()
      )
    }
  }, refs)
}
