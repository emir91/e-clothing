import React from 'react';
import DirectoryItem from '../category-item/directory-item.component';
import './directory.styles.scss'

const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map((category) => {
        return (
          <DirectoryItem key={category.id} category={category}/>
        )
      })}
    </div>

  );
}

export default Directory;