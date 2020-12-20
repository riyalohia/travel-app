import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class HomePage extends Component {

  render() {
    return (
      <Grid container component="main">
        <Grid item xs={12} sm={4} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Things to do
        		</Typography>
            </CardContent>
            {/* <CardActions>
						<Button size="small">Learn More</Button>
					</CardActions> */}
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Things to do
        		</Typography>
            </CardContent>
            {/* <CardActions>
						<Button size="small">Learn More</Button>
					</CardActions> */}
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Things to do
        		</Typography>
            </CardContent>
            {/* <CardActions>
						<Button size="small">Learn More</Button>
					</CardActions> */}
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default HomePage;