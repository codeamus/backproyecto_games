module.exports = {
    testEnvironment: 'node',
    roots: ['<rootDir>'], // Asegúrate de que busca en la raíz del proyecto
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    moduleDirectories: ['node_modules', 'src'], // Si tienes una carpeta src
    testMatch: ['**/__tests__/**/*.+(ts|tsx|js)','**/?(*.)+(spec|test).+(ts|tsx|js)'],
    testPathIgnorePatterns: ['/node_modules/'],
  };
