import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Box, Typography, Input } from '@mui/material';

const Blog = () => {
    const [articles, setArticles] = useState([]);
    const [newBlogUrl, setNewBlogUrl] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const role = localStorage.getItem('role');

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await fetch('http://localhost:4000/blog');
            const data = await response.json();
            setArticles(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleCreateBlog = async () => {
        try {
            await fetch('/api/blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: newBlogUrl }),
            });
            fetchArticles();
            setNewBlogUrl('');
            setOpenModal(false);
        } catch (error) {
            console.error('Error creating blog:', error);
        }
    };

    const handleDeleteBlog = async (id) => {
        try {
            await fetch(`/api/blog/${id}`, {
                method: 'DELETE',
            });
            fetchArticles();
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    return (
        <div className="blog">
            <h1>Articles</h1>
            <ul>
                {articles.map(article => (
                    <li key={article.id}>
                        <Link to={`/article/${article.url}`}>{article.title}</Link>
                        {role === 'Admin' && (
                            <Button onClick={() => handleDeleteBlog(article.id)}>Delete</Button>
                        )}
                    </li>
                ))}
            </ul>
            {/*role === 'Admin' && */}
            {(
                <>
                    <Button onClick={() => setOpenModal(true)}>Creer</Button>
                    <Modal open={openModal} onClose={() => setOpenModal(false)}>
                        <Box
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 300,
                                height: 200,
                                bgcolor: "background.paper",
                                boxShadow: 24,
                                p: 2,
                                borderRadius: 10,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-around",
                                alignItems: "center"
                            }}
                        >
                            <Typography id="modal-modal-title" component="h2">
                                Ajouter un nouvel article
                            </Typography>
                            <Input
                                type="text"
                                placeholder="URL"
                                value={newBlogUrl}
                                onChange={(e) => setNewBlogUrl(e.target.value)}
                            />
                            <Box>
                            <Button variant="outlined" color="error" onClick={()=>setOpenModal(false)} >Annuler</Button>
                            <Button onClick={handleCreateBlog}>Ajouter</Button>
                            </Box>
                        </Box>
                    </Modal>
                </>
            )}
        </div>
    );
};

export default Blog;
