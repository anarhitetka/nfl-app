import axios from 'axios';
import { useEffect, useState } from 'react';
import getCurrentSeason from './getCurrentSeason';

// previous:
// const instance = axios.create({
//     baseURL: 'https://localhost:3000',
//     // baseURL: 'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl',
//     timeout: 16000,
//     headers: { 'Content-Type': 'application/json' }
// });
// const responseBody = (response) => response.data;

const _site = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl';
const _core = 'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl';

const requests = {
    // get: (url) => instance.get(url).then(responseBody),
    useGet: (url) => {
        const urlSecure = url.replace("http://", "https://");

        const [data, setData] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState("");
        useEffect(() => {
            const getData = async () => {
                try {
                    const { data } = await axios(urlSecure);
                    setData(data);
                    setIsLoading(false);
                } catch (error) {
                    // console.error(error);
                    setError(error);
                }
            };
            getData();
        }, [urlSecure]);
        return { data, isLoading, error };
    },
    useGetWithId: (url, id) => {
        const urlSecure = url.replace("http://", "https://");

        const [data, setData] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState("");

        useEffect(() => {
            if (id) {
                const getData = async () => {
                    try {
                        const { data } = await axios(urlSecure);
                        setData(data);
                        setIsLoading(false);
                    } catch (error) {
                        // console.error(error);
                        setError(error);
                    }
                };
                getData();
            }
        }, [urlSecure, id]);

        return { data, isLoading, error };
    },
    useGetAll: (url) => {
        const urlSecure = url.replace("http://", "https://");

        const [endpoints, setEndpoints] = useState([]);
        const [data, setData] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState("");

        useEffect(() => {
            const getEndpoints = async () => {
                setEndpoints([]);
                try {
                    const { data } = await axios(urlSecure);
                    let endpointsArr = [];
                    data.items.forEach((item) => {
                        let secureHttps = item.$ref.replace("http://", "https://");
                        endpointsArr.push(secureHttps);
                    });
                    setEndpoints(endpointsArr);
                } catch (error) {
                    // console.error(error);
                    setError(error);
                }
            };
            getEndpoints();
        }, [urlSecure]);

        useEffect(() => {
            setData([]);
            setIsLoading(true);
            Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
                (data) => {
                    let dataArr = [];
                    data.map((dataItem) => {
                        dataItem.data.$ref.replace("http://", "https://");
                        return dataArr.push(dataItem.data);
                    });
                    setData(dataArr);
                    if (dataArr.length > 0) setIsLoading(false);
                }
            ).catch(err => setError(err));
        }, [endpoints]);

        return { data, isLoading, error };
    },
    useGetHomeAndAwayTeamData: (url) => {
        const urlSecure = url.replace("http://", "https://");

        const [homeTeamScoreEndpoint, setHomeTeamScoreEndpoint] = useState();
        const [awayTeamScoreEndpoint, setAwayTeamScoreEndpoint] = useState();

        const [scoreHomeTeam, setScoreHomeTeam] = useState('/');
        const [scoreAwayTeam, setScoreAwayTeam] = useState('/');

        const [scoreIsFinal, setScoreIsFinal] = useState(false);

        const [homeTeamID, setHomeTeamID] = useState();
        const [awayTeamID, setAwayTeamID] = useState();
        const [error, setError] = useState("");

        useEffect(() => {
            const getGameEndpoints = async () => {
                try {
                    const { data } = await axios(urlSecure);

                    data.competitions[0].competitors.forEach((competitor) => {
                        competitor.homeAway === "home"
                            ? setHomeTeamScoreEndpoint(competitor.score.$ref.replace("http://", "https://"))
                            : setAwayTeamScoreEndpoint(competitor.score.$ref.replace("http://", "https://"));
                        competitor.homeAway === "home"
                            ? setHomeTeamID(competitor.id)
                            : setAwayTeamID(competitor.id);
                    });
                    data.competitions[0].boxscoreAvailable
                        // boxscoreAvailable is FALSE for probowl game after it has been played ! why?.. :|
                        // data.competitions[0].summaryAvailable
                        ? setScoreIsFinal(true)
                        : setScoreIsFinal(false);
                } catch (error) {
                    // console.error(error);
                    setError(error);
                }
            };

            getGameEndpoints();
        }, [urlSecure]);

        useEffect(() => {
            const getHomeTeamScore = async () => {
                try {
                    const { data } = await axios(homeTeamScoreEndpoint);
                    setScoreHomeTeam(data.value);
                } catch (error) {
                    // console.error(error);
                    setError(error);
                }
            };

            const getAwayTeamScore = async () => {
                try {
                    const { data } = await axios(awayTeamScoreEndpoint);
                    setScoreAwayTeam(data.value);
                } catch (error) {
                    // console.error(error);
                    setError(error);
                }
            };

            getHomeTeamScore();
            getAwayTeamScore();
        }, [homeTeamScoreEndpoint, awayTeamScoreEndpoint]);
        return { scoreAwayTeam, scoreHomeTeam, scoreIsFinal, homeTeamID, awayTeamID, error }
    },
    useGetAllTeamsOnBye: (url) => {
        const urlSecure = url.replace("http://", "https://");

        const [endpoints, setEndpoints] = useState([]);
        const [data, setData] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState("");

        useEffect(() => {
            const getEndpoints = async () => {
                setEndpoints([]);
                try {
                    const { data } = await axios(urlSecure);
                    let endpointsArr = [];
                    data.teamsOnBye.forEach((item) => {
                        endpointsArr.push(item.$ref.replace("http://", "https://"));
                    });
                    setEndpoints(endpointsArr);
                } catch (error) {
                    // console.error(error);
                    setError(error);
                }
            };
            getEndpoints();
        }, [urlSecure]);

        useEffect(() => {
            setData([]);
            setIsLoading(true);
            Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
                (data) => {
                    let dataArr = [];
                    data.map((dataItem) => {
                        return dataArr.push(dataItem.data);
                    });
                    setData(dataArr);
                    if (dataArr.length > 0) setIsLoading(false);
                }
            ).catch(err => setError(err));
        }, [endpoints]);

        return { data, isLoading, error };
    },
};

export const ApiCalls = {

    // previous:
    // getTeamEvents: (teamId) => requests.get(`/seasons/${getCurrentSeason()}/teams/${teamId}/events`),
    // getDataFromEndpoint: (endpoint) => requests.get(endpoint),

    // GET TEAM DATA:
    getTeamData: (teamId) => requests.useGetWithId(`${_site}/teams/${teamId}`, teamId),

    // GET ALL EVENTS FOR TEAM WITH {teamId}:
    getTeamEvents: (teamId) => requests.useGetAll(`${_core}/seasons/${getCurrentSeason()}/teams/${teamId}/events`),

    // GET ALL EVENTS FOR A SELECTED WEEK {weekNo}:
    getEventsForWeek: (weekNo, durationRegSeason) => requests.useGetAll(`${_core}/seasons/${getCurrentSeason()}/types/${weekNo <= durationRegSeason ? 2 : 3
        }/weeks/${weekNo <= durationRegSeason ? weekNo : weekNo - durationRegSeason}/events`),

    // GET TEAMS ON BYE FOR {weekNo}
    // Each team has one bye week between Weeks 6 and 14 (regular season)
    getTeamsOnByeForWeekNo: (weekNo, durationRegSeason) => requests.useGetAllTeamsOnBye(`${_core}/seasons/${getCurrentSeason()}/types/${weekNo <= durationRegSeason ? 2 : 3}/weeks/${weekNo <= durationRegSeason ? weekNo : weekNo - durationRegSeason}`),

    // GET INFO FOR ALL WEEKS IN the / preseason type 1, regular season type 2, postseason type 3, offseason type 4:
    getWeeksInfoForSeasonType: (seasonType) => requests.useGetAll(`${_core}/seasons/${getCurrentSeason()}/types/${seasonType}/weeks/`),

    // GET ALL TEAMS DATA:
    getAllTeamsData: () => requests.useGetAll(`${_core}/teams?limit=32`),

    // GET TEAMS BY GROUPS:
    // AFC:
    getAfcEastTeams: () => requests.useGetAll(`${_core}/seasons/${getCurrentSeason()}/types/2/groups/4/teams`),
    getAfcNorthTeams: () => requests.useGetAll(`${_core}/seasons/${getCurrentSeason()}/types/2/groups/12/teams`),
    getAfcSouthTeams: () => requests.useGetAll(`${_core}/seasons/${getCurrentSeason()}/types/2/groups/13/teams`),
    getAfcWestTeams: () => requests.useGetAll(`${_core}/seasons/${getCurrentSeason()}/types/2/groups/6/teams`),
    // NFC:
    getNfcEastTeams: () => requests.useGetAll(`${_core}/seasons/${getCurrentSeason()}/types/2/groups/1/teams`),
    getNfcNorthTeams: () => requests.useGetAll(`${_core}/seasons/${getCurrentSeason()}/types/2/groups/10/teams`),
    getNfcSouthTeams: () => requests.useGetAll(`${_core}/seasons/${getCurrentSeason()}/types/2/groups/11/teams`),
    getNfcWestTeams: () => requests.useGetAll(`${_core}/seasons/${getCurrentSeason()}/types/2/groups/3/teams`),

    // GET DATA ABOUT EVENT - home team / away team:
    getTeamsInfoForEvent: (eventUrl) => requests.useGetHomeAndAwayTeamData(eventUrl),

    // GET GAME SUMMARY
    getGameSummary: (eventId) => requests.useGet(`${_site}/summary?event=${eventId}`),

    // GET TEAM RECORDS (playoff status, stats, records...)
    getTeamRecords: (teamId) => requests.useGet(`${_core}/seasons/${getCurrentSeason()}/types/2/teams/${teamId}/record?lang=en&region=us`),

    // generic useGet
    getDataFromUrl: (url) => requests.useGet(url),
};
