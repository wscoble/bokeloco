const github = {
  init: (events) => {
    events.githubAvailable.dispatch(true)
  }
}

export default github
