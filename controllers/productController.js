// productController.js
const { Product } = require('../models'); // Asumiendo que Product es un modelo definido en tu ORM

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    // Ordenamos los productos por ID en orden ascendente
    const products = await Product.findAll({ order: [['id', 'ASC']] });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

// Obtener un producto por su ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl, category, format, developer } = req.body;
    const newProduct = await Product.create({
      name,
      description,
      price,
      imageUrl,
      category,
      format,
      developer
    });
    res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el producto' });
  }
};

// Actualizar un producto por su ID
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price, imageUrl, category, format, developer } = req.body;
    
    const [updated] = await Product.update(
      { name, description, price, imageUrl, category, format, developer },
      { where: { id: productId } }
    );

    if (updated) {
      const updatedProduct = await Product.findByPk(productId);
      res.json({ message: 'Producto actualizado exitosamente', product: updatedProduct });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
};

// Eliminar un producto por su ID
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deleted = await Product.destroy({ where: { id: productId } });

    if (deleted) {
      res.json({ message: 'Producto eliminado exitosamente' });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
};