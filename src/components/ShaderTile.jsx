import React from "react";

const ShaderTile = ({ name, thumbnail, description, views, id }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 mb-8">
      <div className="flex flex-col lg:flex-row">
        {/* Shader embed - left side on large screens */}
        <div className="lg:w-1/2 flex-shrink-0">
          <iframe 
            width="100%" 
            height="350" 
            src={`https://www.shadertoy.com/embed/${id}?gui=false&t=300&paused=true&muted=true`} 
            allowFullScreen
            className="w-full h-full"
            title={`Shader: ${name}`}
          />
        </div>
        
        {/* Content - right side on large screens */}
        <div className="lg:w-1/2 flex flex-col">
          {/* Header with title and stats */}
          <div className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white flex-shrink-0">
            <h3 className="text-xl font-bold mb-2 line-clamp-2">{name}</h3>
            <div className="flex items-center text-orange-100">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm font-medium">{views?.toLocaleString() || 0} views</span>
            </div>
          </div>
          
          {/* Description */}
          <div className="p-6 flex-grow">
            {description && (
              <div 
                className="text-gray-700 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
          </div>
          
          {/* Footer with link to full shader */}
          <div className="px-6 pb-6 mt-auto">
            <a 
              href={`https://www.shadertoy.com/view/${id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-md hover:bg-orange-700 transition-colors duration-200"
            >
              <span>View on Shadertoy</span>
              <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShaderTile;
