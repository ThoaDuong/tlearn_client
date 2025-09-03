import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Grid,
    Card,
    CardContent,
    IconButton,
    Chip,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import { Add, Delete, Save } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../stores/store";
import Topic from "../interfaces/Topic";
import TopicDetail from "../interfaces/TopicDetail";
import WordDetail from "../interfaces/WordDetail";
import { addNewTopic, addNewTopicDetail, addNewWordDetail, fetchTopicDetailList, fetchTopicList } from "../stores/slices/topicSlice";

const AdminPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const userStore = useSelector((state: RootState) => state.user);

    // Topic form state
    const [topicForm, setTopicForm] = useState({
        name: "",
        numberOfWords: 0,
        userID: "",
        createdBy: ""
    });

    // Topic Detail form state
    const [topicDetailForm, setTopicDetailForm] = useState({
        topicCardID: "",
        name: "",
        image: ""
    });

    // Word Detail form state
    const [wordDetailForm, setWordDetailForm] = useState({
        topicDetailIDs: [] as string[],
        text: "",
        image: "",
        type: "",
        meaning: "",
        examples: [""],
        pronunciation: ""
    });

    // Lists for display (local preview chips)
    const [topics, setTopics] = useState<Topic[]>([]);
    const [topicDetails, setTopicDetails] = useState<TopicDetail[]>([]);
    const [wordDetails, setWordDetails] = useState<WordDetail[]>([]);

    // Global lists from store
    const topicStore = useSelector((state: RootState) => state.topic);

    // Word form depends on a selected topic to load its details
    const [selectedTopicForWord, setSelectedTopicForWord] = useState<string>("");

    // Form validation errors
    const [topicErrors, setTopicErrors] = useState({
        name: "",
        numberOfWords: ""
    });

    const [topicDetailErrors, setTopicDetailErrors] = useState({
        topicCardID: "",
        name: "",
        image: ""
    });

    const [wordDetailErrors, setWordDetailErrors] = useState({
        text: "",
        meaning: "",
        type: ""
    } as any);

    // Initial fetches and set user ID
    useEffect(() => {
        if (userStore?.id) {
            setTopicForm(prev => ({ ...prev, userID: userStore.id }));
        }
        dispatch(fetchTopicList());
    }, [userStore]);

    // When choosing a topic for word detail, load its topic details
    useEffect(() => {
        if (selectedTopicForWord) {
            dispatch(fetchTopicDetailList(selectedTopicForWord));
        }
    }, [selectedTopicForWord]);

    // Handle topic form input changes
    const handleTopicInputChange = (field: string, value: string | number) => {
        setTopicForm(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (topicErrors[field as keyof typeof topicErrors]) {
            setTopicErrors(prev => ({ ...prev, [field]: "" }));
        }
    };

    // Handle topic detail form input changes
    const handleTopicDetailInputChange = (field: string, value: string) => {
        setTopicDetailForm(prev => ({ ...prev, [field]: value }));
        if (topicDetailErrors[field as keyof typeof topicDetailErrors]) {
            setTopicDetailErrors(prev => ({ ...prev, [field]: "" }));
        }
    };

    // Handle word detail form input changes
    const handleWordDetailInputChange = (field: string, value: string | string[]) => {
        setWordDetailForm((prev: {
            topicDetailIDs: string[];
            text: string;
            image: string;
            type: string;
            meaning: string;
            examples: string[];
            pronunciation: string;
        }) => ({ ...prev, [field]: value }) as typeof wordDetailForm);
        if (wordDetailErrors[field as keyof typeof wordDetailErrors]) {
            setWordDetailErrors((prev: any) => ({ ...prev, [field]: "" }));
        }
    };

    // Add new example field
    const addExample = () => {
        setWordDetailForm(prev => ({
            ...prev,
            examples: [...prev.examples, ""]
        }));
    };

    // Remove example field
    const removeExample = (index: number) => {
        setWordDetailForm(prev => ({
            ...prev,
            examples: prev.examples.filter((_, i) => i !== index)
        }));
    };

    // Update specific example
    const updateExample = (index: number, value: string) => {
        setWordDetailForm(prev => ({
            ...prev,
            examples: prev.examples.map((example, i) => i === index ? value : example)
        }));
    };

    // Add word detail to the list
    const addWordDetail = async () => {
        if (!validateWordDetail()) return;
        await dispatch(addNewWordDetail({
            topicDetailIDs: wordDetailForm.topicDetailIDs,
            text: wordDetailForm.text,
            image: wordDetailForm.image,
            type: wordDetailForm.type,
            meaning: wordDetailForm.meaning,
            examples: wordDetailForm.examples,
            pronunciation: wordDetailForm.pronunciation,
        }));
        setWordDetailForm({
            topicDetailIDs: [],
            text: "",
            image: "",
            type: "",
            meaning: "",
            examples: [""],
            pronunciation: ""
        });
    };

    // Remove word detail from list
    const removeWordDetail = (id: string) => {
        setWordDetails(prev => prev.filter(word => word.id !== id));
    };

    // Validation functions
    const validateTopic = () => {
        const errors = { name: "", numberOfWords: "" };
        if (!topicForm.name.trim()) errors.name = "Topic name is required";
        if (topicForm.numberOfWords < 0) errors.numberOfWords = "Word count must be non-negative";
        
        setTopicErrors(errors);
        return !errors.name && !errors.numberOfWords;
    };

    const validateTopicDetail = () => {
        const errors = { topicCardID: "", name: "", image: "" };
        if (!topicDetailForm.topicCardID) errors.topicCardID = "Topic ID is required";
        if (!topicDetailForm.name.trim()) errors.name = "Topic detail name is required";
        if (!topicDetailForm.image.trim()) errors.image = "Image URL is required";
        
        setTopicDetailErrors(errors);
        return !errors.topicCardID && !errors.name && !errors.image;
    };

    const validateWordDetail = () => {
        const errors = { text: "", meaning: "", type: "" } as any;
        if (!wordDetailForm.topicDetailIDs || wordDetailForm.topicDetailIDs.length === 0) errors.topicDetailIDs = "Select at least one topic detail";
        if (!wordDetailForm.text.trim()) errors.text = "Word text is required";
        if (!wordDetailForm.meaning.trim()) errors.meaning = "Meaning is required";
        if (!wordDetailForm.type.trim()) errors.type = "Word type is required";
        
        setWordDetailErrors(errors);
        return !errors.topicDetailIDs && !errors.text && !errors.meaning && !errors.type;
    };

    // Handle topic form submission
    const handleTopicSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateTopic()) return;
        await dispatch(addNewTopic({ 
            name: topicForm.name, 
            numberOfWords: topicForm.numberOfWords, 
            createdBy: 'admin'
        }));
        setTopicForm(prev => ({ ...prev, name: "", numberOfWords: 0 }));
    };

    // Handle topic detail form submission
    const handleTopicDetailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateTopicDetail()) return;
        await dispatch(addNewTopicDetail({ topicCardID: topicDetailForm.topicCardID, name: topicDetailForm.name, image: topicDetailForm.image }));
        setTopicDetailForm({ topicCardID: "", name: "", image: "" });
        if (selectedTopicForWord) {
            dispatch(fetchTopicDetailList(selectedTopicForWord));
        }
    };

    // Clear all forms
    const clearAllForms = () => {
        setTopicForm({ name: "", numberOfWords: 0, userID: userStore?.id || "", createdBy: "" });
        setTopicDetailForm({ topicCardID: "", name: "", image: "" });
        setWordDetailForm({
            topicDetailIDs: [],
            text: "",
            image: "",
            type: "",
            meaning: "",
            examples: [""],
            pronunciation: ""
        });
        setWordDetails([]);
        setTopics([]);
        setTopicDetails([]);
    };

    return (
        <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
            <Typography variant="h4" sx={{ textAlign: "center", mb: 4, color: "primary.main" }}>
                Admin Dashboard
            </Typography>

            <Grid container spacing={4}>
                {/* Topic Form */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" sx={{ mb: 3, color: "blue.600", textAlign: "center" }}>
                                Add New Topic
                            </Typography>
                            
                            <Box component="form" onSubmit={handleTopicSubmit}>
                                <TextField
                                    fullWidth
                                    label="Topic Name"
                                    value={topicForm.name}
                                    onChange={(e) => handleTopicInputChange("name", e.target.value)}
                                    error={!!topicErrors.name}
                                    helperText={topicErrors.name}
                                    sx={{ mb: 2 }}
                                />
                                
                                <TextField
                                    fullWidth
                                    label="Number of Words"
                                    type="number"
                                    value={topicForm.numberOfWords}
                                    onChange={(e) => handleTopicInputChange("numberOfWords", parseInt(e.target.value) || 0)}
                                    error={!!topicErrors.numberOfWords}
                                    helperText={topicErrors.numberOfWords}
                                    sx={{ mb: 2 }}
                                />
                                
                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={<Add />}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                >
                                    Add Topic
                                </Button>
                            </Box>

                            {/* Display added topics */}
                            {topics.length > 0 && (
                                <Box sx={{ mt: 3 }}>
                                    <Typography variant="h6" sx={{ mb: 2 }}>Added Topics:</Typography>
                                    {topics.map((topic) => (
                                        <Chip
                                            key={topic.id}
                                            label={`${topic.name} (${topic.numberOfWords} words)`}
                                            color="primary"
                                            sx={{ m: 0.5 }}
                                        />
                                    ))}
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Topic Detail Form */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" sx={{ mb: 3, color: "blue.600", textAlign: "center" }}>
                                Add Topic Detail
                            </Typography>
                            
                            <Box component="form" onSubmit={handleTopicDetailSubmit}>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id="topic-select-label">Topic</InputLabel>
                                    <Select
                                        labelId="topic-select-label"
                                        label="Topic"
                                        value={topicDetailForm.topicCardID}
                                        onChange={(e) => handleTopicDetailInputChange("topicCardID", e.target.value as string)}
                                        error={!!topicDetailErrors.topicCardID}
                                    >
                                        {topicStore.listTopic.map((t: Topic) => (
                                            <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {topicDetailErrors.topicCardID && (
                                    <Typography color="error" variant="caption">{topicDetailErrors.topicCardID}</Typography>
                                )}
                                
                                <TextField
                                    fullWidth
                                    label="Topic Detail Name"
                                    value={topicDetailForm.name}
                                    onChange={(e) => handleTopicDetailInputChange("name", e.target.value)}
                                    error={!!topicDetailErrors.name}
                                    helperText={topicDetailErrors.name}
                                    sx={{ mb: 2 }}
                                />
                                
                                <TextField
                                    fullWidth
                                    label="Image URL"
                                    value={topicDetailForm.image}
                                    onChange={(e) => handleTopicDetailInputChange("image", e.target.value)}
                                    error={!!topicDetailErrors.image}
                                    helperText={topicDetailErrors.image}
                                    sx={{ mb: 2 }}
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={<Save />}
                                    fullWidth
                                >
                                    Save Topic Detail
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Word Detail Form */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" sx={{ mb: 3, color: "blue.600", textAlign: "center" }}>
                                Add Word Detail
                            </Typography>

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="word-topic-select-label">Topic</InputLabel>
                                <Select
                                    labelId="word-topic-select-label"
                                    label="Topic"
                                    value={selectedTopicForWord}
                                    onChange={(e) => {
                                        setSelectedTopicForWord(e.target.value as string);
                                        setWordDetailForm((prev) => ({ ...prev, topicDetailIDs: [] }));
                                    }}
                                >
                                    {topicStore.listTopic.map((t: Topic) => (
                                        <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 2 }} disabled={!selectedTopicForWord}>
                                <InputLabel id="topic-detail-select-label">Topic Detail</InputLabel>
                                <Select
                                    labelId="topic-detail-select-label"
                                    multiple
                                    label="Topic Detail"
                                    value={wordDetailForm.topicDetailIDs}
                                    onChange={(e) => handleWordDetailInputChange("topicDetailIDs", (e.target.value as string[]))}
                                    error={!!(wordDetailErrors as any).topicDetailIDs}
                                >
                                    {topicStore.listTopicDetail.map((td: TopicDetail) => (
                                        <MenuItem key={td.id} value={td.id}>{td.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {(wordDetailErrors as any).topicDetailIDs && (
                                <Typography color="error" variant="caption">{(wordDetailErrors as any).topicDetailIDs}</Typography>
                            )}

                            <TextField
                                fullWidth
                                label="Word Text"
                                value={wordDetailForm.text}
                                onChange={(e) => handleWordDetailInputChange("text", e.target.value)}
                                error={!!wordDetailErrors.text}
                                helperText={wordDetailErrors.text}
                                sx={{ mb: 2 }}
                            />
                            
                            <TextField
                                fullWidth
                                label="Meaning"
                                value={wordDetailForm.meaning}
                                onChange={(e) => handleWordDetailInputChange("meaning", e.target.value)}
                                error={!!wordDetailErrors.meaning}
                                helperText={wordDetailErrors.meaning}
                                sx={{ mb: 2 }}
                            />
                            
                            <TextField
                                fullWidth
                                label="Image URL"
                                value={wordDetailForm.image}
                                onChange={(e) => handleWordDetailInputChange("image", e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            
                            <TextField
                                fullWidth
                                label="Type"
                                value={wordDetailForm.type}
                                onChange={(e) => handleWordDetailInputChange("type", e.target.value)}
                                error={!!wordDetailErrors.type}
                                helperText={wordDetailErrors.type}
                                sx={{ mb: 2 }}
                            />
                            
                            <TextField
                                fullWidth
                                label="Pronunciation"
                                value={wordDetailForm.pronunciation}
                                onChange={(e) => handleWordDetailInputChange("pronunciation", e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            
                            {/* Examples */}
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>Examples:</Typography>
                                {wordDetailForm.examples.map((example, index) => (
                                    <Box key={index} sx={{ display: "flex", gap: 1, mb: 1 }}>
                                        <TextField
                                            size="small"
                                            label={`Example ${index + 1}`}
                                            value={example}
                                            onChange={(e) => updateExample(index, e.target.value)}
                                            sx={{ flex: 1 }}
                                        />
                                        {wordDetailForm.examples.length > 1 && (
                                            <IconButton
                                                onClick={() => removeExample(index)}
                                                color="error"
                                                size="small"
                                            >
                                                <Delete />
                                            </IconButton>
                                        )}
                                    </Box>
                                ))}
                                <Button
                                    onClick={addExample}
                                    startIcon={<Add />}
                                    size="small"
                                    sx={{ mt: 1 }}
                                >
                                    Add Example
                                </Button>
                            </Box>

                            <Button
                                onClick={addWordDetail}
                                variant="outlined"
                                startIcon={<Add />}
                                fullWidth
                                sx={{ mb: 2 }}
                            >
                                Add Word Detail
                            </Button>

                            {/* Display added word details */}
                            {wordDetails.length > 0 && (
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="subtitle1" sx={{ mb: 1 }}>Added Words:</Typography>
                                    <Stack direction="row" flexWrap="wrap" gap={1}>
                                        {wordDetails.map((word) => (
                                            <Chip
                                                key={word.id}
                                                label={word.text}
                                                color="secondary"
                                                onDelete={() => removeWordDetail(word.id)}
                                            />
                                        ))}
                                    </Stack>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Clear All Button */}
            <Box sx={{ textAlign: "center", mt: 4 }}>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={clearAllForms}
                    sx={{ px: 4 }}
                >
                    Clear All Forms
                </Button>
            </Box>

            {/* Display added topic details */}
            {topicDetails.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
                        Added Topic Details
                    </Typography>
                    <Grid container spacing={2}>
                        {topicDetails.map((topicDetail) => (
                            <Grid item xs={12} md={6} key={topicDetail.id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">{topicDetail.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Topic ID: {topicDetail.topicCardID}
                                        </Typography>
                                        {/* Word details are managed separately now */}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Box>
    );
};

export default AdminPage;