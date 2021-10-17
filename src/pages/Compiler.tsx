import React, { useState } from "react";
import CodeMirror, { scrollPastEnd } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript"
import { makeStyles, createStyles } from "@mui/styles";
import { Button, Container, FormControl,
     Grid, InputLabel, MenuItem,
      Paper, TextareaAutosize, Typography,
       Theme } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CompilerService from "../services/CompilerService";
import IRuncode from "../types/IRuncode";
import { Box } from "@mui/system";


const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        minHeight: '100vh',
        marginTop: '20vh',
        justifyContent: 'center',
        alignItems: 'top',
        display: 'flex',
        backgroundColor: 'F5F5DC',
    },
    editor: {
        fontSize: 17,
        width: "1000px",
        marginBottom: '10px',
        borderStyle: 'groove', 
    },
    output: {
        marginTop: '20px',
        fontSize: 18,
    },
}));


const Compiler: React.FC = () => {
    const initCompilerState = {
        source: "",
        language: "",
        input: "",
        output: "",
    }
    const [lang, setLang] = React.useState('');
    const [source, setSource] = useState<string>('');
    const [input, setInput] = useState<string>('');
    const [output, setOutput] = useState<IRuncode>(initCompilerState);
    const runCode = async () => {
        let data: IRuncode = {
            source: source,
            language: 'python',
            input: input,
        }
        CompilerService.create(data)
        .then(res => {
            setOutput({
                source: res.data.source,
                input: res.data.input,
                output: res.data.output,
            })
        })
    }
    

    const handleChange = (event: SelectChangeEvent) => {
        setLang(event.target.value as string);
    };
    const classes = useStyles();
    return (
        <Container className={classes.root}>
            <Grid container>
            <Box sx={{ minWidth: 150}}>
            <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Language</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={lang}
                label="Language"
                onChange={handleChange}
                >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            </Box>
            </Grid>
            <CodeMirror
                height="500px"
                extensions={[javascript({typescript: true}), scrollPastEnd()]}
                onChange={(value, viewUpdate) => {
                setSource(value)
                }}
                className={classes.editor}
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
                    <Button variant="contained" onClick={runCode}>Run</Button>
                </Grid>
            </Grid>
            <TextareaAutosize
                className={classes.output}
                aria-label="minimum height"
                minRows={10}
                placeholder="Output"
                style={{ width: 1000 }}
                value={output.output}
            />
        </Container>
  );
}

export default Compiler