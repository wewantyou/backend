'use strict'

const request = require('request-promise-native')
require('dotenv').config()

function getFullData (user) {
  return request({
    uri: `https://api.github.com/users/${user}`,
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      'User-Agent': 'Request-Promise',
    }
  })
}

function find (data) {
  let user = data

  const pos = data.indexOf('@')
  if (pos !== -1) {
    user = data.substring(0, pos)
  } else if (data.indexOf('/') !== -1) {
    const arr = data.split('/')
    user = arr[arr.length - 1]
  }

  let fullData = null

  return getFullData(user)
    .then((data) => {
      fullData = data

      if (fullData.message === 'Not Found' || fullData === null) {
        return {}
      }

      return fullData
    })
    .catch((err) => {
      console.log(err)

      return {}
    })
}

function count (uri) {
  return request({
    uri,
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      'User-Agent': 'Request-Promise',
    }
  })
    .then((res) => {
      return JSON.parse(res).length
    })
    .catch((err) => {
      console.log(err)
      return -1
    })
}

function getReposStats (uri) {
  const stats = {}
  const languages = {}
  const repo_languages = {}
  let owned_repos = 0
  let starrers = 0
  let watchers = 0

  return request({
    uri,
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      'User-Agent': 'Request-Promise',
    },
  })
    .then(async (res) => {
      const arr = JSON.parse(res)

      for (let i = 0; i < arr.length; ++i) {
        const repo = arr[i]

        if (repo.fork === false) {
          owned_repos++
        }

        if (repo.language) {
          if (repo_languages[repo.language]) {
            ++repo_languages[repo.language]
          } else {
            repo_languages[repo.language] = 1
          }
        }

        starrers += repo.stargazers_count
        watchers += repo.watchers_count

        await request({
          uri: repo.languages_url,
          headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
            'User-Agent': 'Request-Promise',
          },
        })
          .then((res) => {
            try {
              const langs = JSON.parse(res)

              for (let lang in langs) {
                if (languages[lang]) {
                  languages[lang] += langs[lang]
                } else {
                  languages[lang] = langs[lang]
                }
              }
            } catch (er) {
              return
            }
          })
      }

      stats.languages = languages
      stats.repository_languages = repo_languages
      stats.owned_repositories = owned_repos
      stats.starrers = starrers
      stats.watchers = watchers
      return stats
    })
    .catch((err) => {
      console.log(err)
      return -1
    })
}

module.exports = {
  find,
  count,
  getReposStats,
}
