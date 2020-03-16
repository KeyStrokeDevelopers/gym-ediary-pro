/* eslint-disable */
import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import ReportIcon from '@material-ui/icons/Report';
import Divider from '@material-ui/core/Divider';
import StarBorder from '@material-ui/icons/StarBorder';
import Star from '@material-ui/icons/Star';
import styles from './email-jss';

class WorkoutNutritionList extends React.Component {
  state = {
    anchorElOpt: null,
    itemToMove: null
  };

  handleClickOpt = (event, item) => {
    this.setState({
      anchorElOpt: event.currentTarget,
      itemToMove: item
    });
  };

  handleCloseOpt = () => {
    this.setState({ anchorElOpt: null });
  };

  handleDelete = (data) => {
    const { deleteWorkoutNutritionData } = this.props;
    deleteWorkoutNutritionData(data);
  }

  handleEdit = (data) => {
    const { edit } = this.props;
    edit(data);
  }

  render() {
    const {
      classes,
      workoutNutritionData,
      openMail,
      toggleStar,
    } = this.props;

    const getWorkoutNutrition = dataArray => dataArray.map((data) => (
      <ExpansionPanel className={classes.emailList} key={Math.random()} onChange={() => openMail()}>
        <ExpansionPanelSummary className={classes.emailSummary} expandIcon={<ExpandMoreIcon />}>
          <div className={classes.fromHeading}>
            <Tooltip id="tooltip-mark" title="Stared">
              <IconButton onClick={() => toggleStar(data)} className={classes.starBtn}>{data.date ? (<Star className={classes.iconOrange} />) : (<StarBorder />)}</IconButton>
            </Tooltip>
            <Avatar alt="avatar" className={classes.avatar}><ReportIcon /></Avatar>
            {/* <Typography className={classes.heading} display="block">
                <Typography variant="caption" display="block">{data.nSunday}</Typography>
              </Typography> */}
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading} noWrap>WorkoutNutrition Information</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <section>
            <div className={classes.topAction}>
              <Typography className={classes.headMail}>
                <Fragment>
                  {data.height}
                  {' '}
                  Workout Nutrition
                </Fragment>
              </Typography>
            </div>
            <div className={classes.emailContent} style={{ maxHeight: '400px', overflow: 'scroll' }}>
              <Typography variant="h6" gutterBottom>
                <div>
                  {data.nSunday && (
                    <>
                      <div>{`Sunday Nutrition : ${data.nSunday}`}</div>
                      <Divider />
                    </>
                  )
                  }
                  {data.nMonday
                    && (
                      <>
                        <div>{`Monday Nutrition : ${data.nMonday}`}</div>
                        <Divider />
                      </>
                    )
                  }
                  {data.nTuesday
                    && (
                      <>
                        <div>{`Tuesday Nutrition : ${data.nTuesday}`}</div>
                        <Divider />
                      </>
                    )
                  }
                  {data.nWednesday
                    && (
                      <>
                        <div>{`Wednesday Nutrition : ${data.nWednesday}`}</div>
                        <Divider />
                      </>
                    )
                  }
                  {data.nThursday
                    && (
                      <>
                        <div>{`Thursday Nutrition : ${data.nThursday}`}</div>
                        <Divider />
                      </>
                    )
                  }
                  {data.nFriday
                    && (
                      <>
                        <div>{`Friday Nutrition : ${data.nFriday}`}</div>
                        <Divider />
                      </>
                    )
                  }
                  {data.nSaturday
                    && (
                      <>
                        <div>{`Saturday Nutrition : ${data.nSaturday}`}</div>
                        <Divider />
                      </>
                    )
                  }
                  {data.wSunday
                    && (
                      <>
                        <div>{`Sunday Workout : ${data.wSunday}`}</div>
                        <Divider />
                      </>
                    )
                  }
                  {data.wMonday
                    && (
                      <>
                        <div>{`Monday Workout : ${data.wMonday}`}</div>
                        <Divider />
                      </>
                    )
                  }
                  {data.wTuesday
                    && (
                      <>
                        <div>{`Tuesday Workout : ${data.wTuesday}`}</div>
                        <Divider />
                      </>
                    )
                  }
                  {data.wWednesday
                    && (
                      <>
                        <div>{`Wednesday Workout : ${data.wWednesday}`}</div>
                        <Divider />
                      </>
                    )
                  }
                  {data.wThursday
                    && (
                      <>
                        <div>{`Thursday Workout : ${data.wThursday}`}</div>
                        <Divider />
                      </>
                    )
                  }
                  {data.wFriday
                    && (
                      <>
                        <div>{`Friday Workout : ${data.wFriday}`}</div>
                        <Divider />
                      </>
                    )
                  }
                  {data.wSaturday
                    && (
                      <>
                        <div>{`Saturday Workout : ${data.wSaturday}`}</div>
                      </>
                    )
                  }
                </div>
              </Typography>
              {/* <article dangerouslySetInnerHTML={renderHTML} /> */}
            </div>
          </section>
        </ExpansionPanelDetails>

        <Divider />
        <ExpansionPanelActions>
          <div className={classes.action}>
            <Button size="small" onClick={() => this.handleEdit(data)}>Edit</Button>
            <Button size="small" color="secondary" onClick={() => this.handleDelete(data._id)}>Delete</Button>
          </div>
        </ExpansionPanelActions>
      </ExpansionPanel>
    ));

    return (
      <main className={classes.content}>
        {workoutNutritionData && workoutNutritionData.length >= 1 && getWorkoutNutrition(workoutNutritionData)}
      </main>
    );
  }
}


export default withStyles(styles)(WorkoutNutritionList);
