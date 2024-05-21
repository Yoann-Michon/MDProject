import { Button, Modal, Box, Typography, Input, TextField, Card, CardContent, CardActions } from '@mui/material';
import React, { useState } from 'react';

const Shop = () => {
    const [openModal, setOpenModal] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' });
    const [products, setProducts] = useState([]);

    const handleCreateProduct = () => {
        setOpenModal(false);
        setProducts([...products, newProduct]);
        setNewProduct({ name: '', description: '', price: '' });
    };

    const handleDeleteProduct = (index) => {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        setProducts(updatedProducts);
    };

    return (
        <div className="home">
            <h1>Shop</h1>
            <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {products.map((product, index) => (
                    <Card key={index} sx={{ maxWidth: 300 }}>
                        <Box
              component="img"
              src={product.image}
              alt="product image"
              sx={{
                width: "300px",
                height: "300px",
                objectFit: "cover",
              }}
            />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {product.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {product.description}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Prix: {product.price}
                            </Typography>
                        </CardContent>
                        {role === 'Admin' && (
                        <CardActions>
                            <Button size="small" color="error" onClick={() => handleDeleteProduct(index)}>Supprimer</Button>
                        </CardActions>
                        )}
                    </Card>
                ))}
            </Box>
            {/*role === 'Admin' && */}
            {(
                <>
                    <Button onClick={() => setOpenModal(true)}>Créer</Button>
                    <Modal open={openModal} onClose={() => setOpenModal(false)}>
                        <Box
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 500,
                                height: 300,
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
                                Nouveau produit
                            </Typography>
                            <Box sx={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                                <Input
                                    type="text"
                                    placeholder="Nom"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                />
                                <Input
                                    type="text"
                                    placeholder="Prix"
                                    value={newProduct.price}
                                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                />
                            </Box>
                            <TextField
                                type="text"
                                placeholder="Description"
                                value={newProduct.description}
                                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                multiline
                                rows={4}
                                variant="outlined"
                                sx={{width:400}}
                            />
                            <Box>
                                <Button variant="outlined" color="error" onClick={() => setOpenModal(false)}>Annuler</Button>
                                <Button onClick={handleCreateProduct}>Ajouter</Button>
                            </Box>
                        </Box>
                    </Modal>
                </>
            )}
        </div>
    );
};

export default Shop;
