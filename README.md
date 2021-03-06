# ao-graphql-server

Graphql service for querying Neo4j

# samples

```
fragment crystalMatchPlayersConnectionFragment on CrystalMatchPlayersConnection {
    edges {
        node {
            displayName
        }
    }
}
```

```
query getMatches {
    crystalMatches {
        matchId
        time
        team1Tickets
        team2Tickets
        team1Captain: playersConnection(where: {
            edge: {
                team: 1
            }
        }, first: 1) {
            ...crystalMatchPlayersConnectionFragment
        }
        team2Captain: playersConnection(where: {
            edge: {
                team: 2
            }
        }, first: 1) {
            ...crystalMatchPlayersConnectionFragment
        }
    }
}
```

```
query getMatchDetails($where: CrystalMatchWhere) {
    crystalMatches(where: $where) {
        matchId
        level
        team1Tickets
        team2Tickets
        time
        winner
        playersConnection {
            edges {
                node {
                    displayName
                }
                healing
                deaths
                kills
                team
            }
        }
    }
}
```

Register guild

```
mutation RegisterGuild($guildId: String!, $channelId: String!, $guildName: String!) {
  registerGuild(guildId: $guildId, channelId: $channelId, guildName: $guildName) {
    guildId
    guildName
    discordChannels {
      channelId
    }
  }
} {
  "guildId": "g123",
  "channelId": "c",
  "guildName": "g"
}
```

Get registered guilds

```
query RegisteredGuilds {
  registeredGuilds {
    guildId
  }
}
```
