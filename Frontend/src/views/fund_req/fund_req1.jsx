import React, { Fragment, Component } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import MyEditor from "../add_scheme/editor";
import { green } from "@material-ui/core/colors";
import { createFundRequest } from "../../core_api_calls/requests"
import { getSchemeBySlug } from "../../core_api_calls/schemes"
import ReactQuill from 'react-quill';

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

const useStyles = makeStyles((theme) => ({
    "@global": {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: "none",
        },
    },
    heading: {
        color: "#E76829",
        fontWeight: "600",
        display: "flex",
        justifyItems: "left",
        padding: "1rem 0",
    },
    input: {
        display: "none",
    },
    margin: {
        margin: theme.spacing(1),
    },
    my_button: {
        margin: theme.spacing(1, 1.5),
        float: "right",
    },
    my_form: {
        display: "flex",
        flexDirection: "row",
        justifyItems: "left",
        paddingBottom: "10px",
    },
}));


class RaiseRequest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            schemeName: "",
            schemeId: null,
            description: "",
            amount: "",
            document: ""

        }
    }

    componentDidMount() {
        this.preload(this.props.match.params.slug);
    }


    async preload(slug) {
        const response = await getSchemeBySlug(slug);
        console.log("response: ", response);
        this.setState({
            schemeName: response.data.name,
            schemeId: response.data.id
        })

    };

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,

        });
    };

    onDescriptionChange = (e) => {
        this.setState({
            description: e,
        });
    };

    onSubmitData = () => {
        const requiredData = {
            scheme: this.state.schemeId,
            description: this.state.description,
            amount: this.state.amount
        }
        createFundRequest(requiredData);
    }


    render() {
        return (
            <Fragment>
                <CssBaseline />

                <section style={{ paddingLeft: "10%", paddingTop: "2rem" }}>
                    {/* Hero unit */}
                    <Container>
                        <div>
                            <Typography
                                component="div"
                                style={{
                                    fontWeight: "600",
                                    marginTop: "4rem",
                                    width: "90vh",
                                    height: "8vh",
                                    color: "black",
                                    borderBottom: `1px solid ${theme.palette.divider}`,
                                    marginBottom: "1rem",
                                }}
                                variant="h4"
                                align="left"
                                gutterBottom
                            >
                                Raise a fund request
                    </Typography>

                            <form>


                                <h5 style={{
                                    color: "#E76829",
                                    fontWeight: "600",
                                    display: "flex",
                                    justifyItems: "left",
                                    padding: "1rem 0",
                                }}>Fund Amount(in Cr):</h5>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyItems: "left",
                                    paddingBottom: "10px",
                                }}>
                                    <TextField
                                        className="form-box"
                                        label=""
                                        value=""
                                        placeholder="Amount in Crores"
                                        id="outlined-size-small"
                                        defaultValue=""
                                        variant="outlined"
                                        size="small"
                                        name="amount"
                                        type="number"
                                        value={this.state.amount}
                                        onChange={this.onValueChange}
                                    />
                                </div>

                                <h5 style={{
                                    color: "#E76829",
                                    fontWeight: "600",
                                    display: "flex",
                                    justifyItems: "left",
                                    padding: "1rem 0",
                                }}>Add Description </h5>

                                <div>
                                    <ReactQuill value={this.state.description}
                                        onChange={this.onDescriptionChange}
                                        style={{
                                            height: "20vh",
                                            width: "80%"
                                        }}
                                    />
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyItems: "left",
                                        paddingTop: "2rem",
                                    }}
                                >

                                    <div>
                                        <input
                                            style={{
                                                display: "flex",
                                                height: "5vh",
                                                paddingTop: "20px"
                                            }}
                                            accept="image/file*"
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                            onChange={this.state.document}
                                        />
                                    </div>
                                </div>

                                <div
                                    style={{
                                        padding: "15px 0",
                                    }}
                                >
                                    <Button
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyItems: "left",
                                            backgroundColor: "#E76829",
                                            color: "white",
                                        }}
                                        variant="contained"
                                        onClick={this.onSubmitData}
                                    >
                                        Request
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Container>
                </section>
            </Fragment >
        );
    }


}

export default RaiseRequest;