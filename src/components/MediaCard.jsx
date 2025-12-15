import React from 'react';

const MediaCard = ({ item }) => {
    return (
        <div className="card h-100 shadow-sm border-1">
            <img
                src={item.image}
                alt={item.title}
                className="card-img-top"
                style={{ objectFit: 'cover', height: '200px' }}
            />
            <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text text-muted">{item.description}</p>
            </div>
        </div>
    );
};

export default MediaCard;
