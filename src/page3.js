import React from 'react';
import { motion } from 'framer-motion';

const Page3 = () => {
  return (
    <motion.div
      className="page"
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <h1>Page 3</h1>
    </motion.div>
  );
};

export default Page3;
