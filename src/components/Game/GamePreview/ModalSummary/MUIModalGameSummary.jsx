import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import LinearProgress from '@mui/material/LinearProgress';
import styled from 'styled-components';
import { Link } from "react-router-dom";

import ScoringSummary from '../../../GameScoringSummary/ScoringSummary';
import { ApiCalls } from "../../../../utils/apiCalls";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const S = {};
S.CloseButton = styled.button`
    
	overflow: hidden;
	position: relative;
	border: none;
	padding: 0;
	width: 2em; height: 2em;
	border-radius: 50%;
	background: transparent;
	color: black;
	font: inherit;
	text-indent: 100%;
	cursor: pointer;

	&:focus {
		outline: solid 0 transparent;
		box-shadow: 0 0 0 2px #8ed0f9
	}

	&:hover {
		background: rgba(29, 161, 142, .1)
	}

	&:before, &:after {
		position: absolute;
		top: 15%; left: calc(50% - .0625em);
		width: .125em; height: 70%;
		border-radius: .125em;
		transform: rotate(45deg);
		background: currentcolor;
		content: ''
	}

	&:after { transform: rotate(-45deg); }

`;
S.StyledLink = styled(Link)`
    text-decoration: none;
    font-weight: 600;

`;


export default function MUIModalGameSummary({ open, handleClose, eventId, gameName, awayTeamID, homeTeamID, awayTeamData, homeTeamData }) {
    const gameSummaryData = ApiCalls.getGameSummary(eventId);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, width: '70%' }}>
                    {/* GAME NAME  */}
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {gameName}
                        </Typography>
                        <S.CloseButton onClick={handleClose}>Close</S.CloseButton>
                    </div>
                    {/* ARTICLE HEADLINE + LINK TO ESPN */}
                    <div style={{ fontWeight: 600 }}>
                        <a href={gameSummaryData.data.article?.links?.web.href} target="blank" style={{ color: "black" }}> {gameSummaryData.data.article?.headline} (ESPN)</a>

                    </div>
                    <div>
                        {gameSummaryData.data.article?.description}{" "}
                    </div>
                    {/* LINK TO GAME PAGE  */}
                    <S.StyledLink to={`/games/${eventId}`} state={{ from: { awayTeamID, homeTeamID, awayTeamData, homeTeamData } }} >Go to game details page</S.StyledLink>
                    {/* SUMMARY OF GAME  */}
                    <div>
                        {
                            gameSummaryData.isLoading
                                ? <LinearProgress />
                                : (
                                    <div style={{ overflowY: "scroll" }}>
                                        {gameSummaryData.data.scoringPlays
                                            ? <ScoringSummary
                                                scoringPlays={gameSummaryData.data.scoringPlays}
                                                teams={gameSummaryData.data.leaders}
                                                awayTeamID={awayTeamID}
                                                homeTeamID={homeTeamID}
                                            />
                                            : <div>no summary available</div>
                                        }
                                    </div>
                                )
                        }
                    </div>
                </Box>
            </Modal>
        </div >
    );
}