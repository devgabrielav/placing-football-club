const allMatches = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      id: 16,
      teamName: 'São Paulo'
    },
    awayTeam: {
      id: 8,
      teamName: 'Grêmio'
    }
  },
  {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      id: 16,
      teamName: 'São Paulo'
    },
    awayTeam: {
      id: 9,
      teamName: 'Internacional'
    }
  }
]

const allMatchesTrue = [
  {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      id: 16,
      teamName: "São Paulo"
    },
    awayTeam: {
      id: 9,
      teamName: "Internacional"
    }
  },
  {
    id: 42,
    homeTeamId: 6,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      id: 6,
      teamName: "Ferroviária"
    },
    awayTeam: {
      id: 1,
      teamName: "Avaí/Kindermann"
    }
  }
]

const allMatchesFalse = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      id: 16,
      teamName: "São Paulo"
    },
    awayTeam: {
      id: 8,
      teamName: "Grêmio"
    }
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      id: 9,
      teamName: "Internacional"
    },
    awayTeam: {
      id: 14,
      teamName: "Santos"
    }
  }
]

const matchToUpdate = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 1,
  awayTeamId: 8,
  awayTeamGoals: 1,
  inProgress: false,
}

const bodyWithNoHomeTeamGoals = {
  awayTeamGoals: 1,
}

const bodyWithNoAwayTeamGoals = {
  homeTeamGoals: 3,
}

const correctBody = {
  homeTeamGoals: 3,
  awayTeamGoals: 1
}

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VyQHVzZXIuY29tIiwiaWF0IjoxNzA2NjY0NTIzfQ.kCc80za0mYU5TzqjhaUWNBbrA4UFRbIIDgn5rStLByA';

export default {
  allMatches,
  allMatchesTrue,
  allMatchesFalse,
  token,
  matchToUpdate,
  bodyWithNoHomeTeamGoals,
  bodyWithNoAwayTeamGoals,
  correctBody,
};