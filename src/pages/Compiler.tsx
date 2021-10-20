import React, { useState } from "react";
import { makeStyles, createStyles } from "@mui/styles";
import {
    Button, Container, Grid,
    TextareaAutosize, Theme,
    Autocomplete, TextField
} from "@mui/material";
import CompilerService from "../services/CompilerService";
import IRuncode from "../types/IRuncode";
import { Box } from "@mui/system";
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Editor from "@monaco-editor/react";
import SendIcon from '@mui/icons-material/Send';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        minHeight: '100vh',
        marginTop: '10vh',
        justifyContent: 'center',
        alignItems: 'top',
        display: 'flex',
        backgroundColor: 'F5F5DC',
    },
    editor: {
        width: "1000px",
        marginBottom: '10px',
        borderStyle: 'groove',
    },
    output: {
        marginTop: '20px',
        fontSize: 18,
        marginBottom: '20px',
    },
}));
const languages = ['python', 'javascript', 'java'];

const Compiler: React.FC = () => {
    const initCompilerState = {
        source: "",
        language: "",
        input: "",
        output: "",
    }
    const [lang, setLang] = React.useState<string>('python');
    const [source, setSource] = useState<string>('');
    const [input, setInput] = useState<string>('');
    const [loading, setLoading] = React.useState(false);
    const [output, setOutput] = useState<IRuncode>(initCompilerState);
    const [btnInfo, setBtnInfo] = useState<string>('Run');

    function handleEditorChange(value: any, event: any) {
        setSource(value as string);
    }

    const runCode = async () => {
        if (!loading) {
            setBtnInfo('Loading...');
            setLoading(true);
            let data: IRuncode = {
                source: source,
                language: lang as string,
                input: input,
            }
            try {
                CompilerService.create(data)
                .then(res => {
                    setOutput({
                        source: res.data.source,
                        input: res.data.input,
                        output: res.data.output,
                    })
                    setLoading(false);
                    setBtnInfo('Run');
                })
            } catch (error) {
                setLoading(false);
                setBtnInfo('Run');
                console.error(error as string);
            }
        }
    }

    const classes = useStyles();
    return (
        <Container className={classes.root}>
            <Grid container>
                <Box sx={{ minWidth: 150 }}>
                    <Autocomplete
                        disableClearable
                        defaultValue={languages[0]}
                        onChange={(event, value: string) => {
                            setLang(value)
                        }}
                        id="controllable-states-demo"
                        options={languages}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Language"
                        />}
                    />
                </Box>
            </Grid>
            <Editor
                className={classes.editor}
                height="500px"
                language={lang}
                defaultValue="// some comment"
                onChange={handleEditorChange}
            />
            <Grid container spacing={5}>
                <Grid item>
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={15}
                        placeholder="Input"
                        style={{ width: 600 }}
                        onChange={(e) => {
                            setInput(e.target.value)
                        }}
                    />
                </Grid>
                <Grid item >
                    <Box sx={{ m: 1, position: 'relative' }}>
                        {loading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: green[500],
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                        <Button variant="contained" endIcon={<SendIcon />}
                            onClick={runCode} disabled={loading}>
                            {btnInfo}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <TextareaAutosize
                className={classes.output}
                aria-label="minimum height"
                minRows={10}
                disabled={true}
                placeholder="Output"
                style={{ width: 1000 }}
                value={output.output}
            />
        </Container>
    );
}

export default Compiler