import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import LinearProgress from '@mui/material/LinearProgress';

import ScoringSummary from './ScoringSummary';
import { ApiCalls } from "../utils/apiCalls";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MUIModalGameSummary({ open, handleClose, eventId, gameName, awayTeamID, homeTeamID }) {
    const gameSummaryData = ApiCalls.getGameSummary(eventId);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {gameName}
                    </Typography>
                    <div>
                        {
                            gameSummaryData.isLoading
                                ? <LinearProgress />
                                : (
                                    <>
                                        {gameSummaryData.data.scoringPlays
                                            ? <ScoringSummary
                                                scoringPlays={gameSummaryData.data.scoringPlays}
                                                teams={gameSummaryData.data.leaders}
                                                awayTeamID={awayTeamID}
                                                homeTeamID={homeTeamID}
                                            />
                                            : <div>no summary available</div>
                                        }

                                        {/* ARTICLE SHORT INFO + LINK TO ESPN  */}
                                        <div>
                                            {gameSummaryData.data.article?.description}{" "}
                                        </div>
                                        <div>
                                            {gameSummaryData.data.article?.headline}
                                        </div>

                                        {gameSummaryData.data.article?.links?.web.href &&
                                            <div><a href={gameSummaryData.data.article?.links?.web.href} target="blank">Read more at ESPN</a></div>
                                        }

                                    </>
                                )
                        }
                    </div>
                </Box>
            </Modal>
        </div>
    );
}