export const thunk = () => {
  return (next: any) => {
    return (action: any) => {
      action && next(action)
    }
  }
}