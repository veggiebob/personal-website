import React from "react";
import { ExternalLinkIcon } from "./BetterLink";

const ShaderTile = ({ name, thumbnail, description, views, likes, id }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-[0_4px_12px_rgba(255,255,255,0.3)] transition-shadow duration-300 mb-8">
      <div className="flex flex-col lg:flex-row">
        {/* Shader embed - left side on large screens */}
        <div className="lg:w-2/3 flex-shrink-0 lg:min-h-[400px]">
          <iframe 
            className="w-full"
            height="400"
            src={`https://www.shadertoy.com/embed/${id}?gui=false&t=300&paused=true&muted=true`} 
            allowFullScreen
            title={`Shader: ${name}`}
          />
        </div>
        
        {/* Content - right side on large screens */}
        <div className="lg:w-1/3 flex flex-col">
          {/* Header with title and stats */}
          <div className="p-6 items-center gradient-secondary text-content-primary flex-shrink-0">
            <h3 className="text-xl font-bold mb-2 line-clamp-2">{name}</h3>
            <div className="flex items-center gap-4 text-primary-light">
              <div className="w-1/2 flex">
                <svg className="h-4 mr-1 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm font-medium float-right">{views?.toLocaleString() || 0} views</span>
              </div>
              <div className="w-1/2 flex items-center">
                <svg className="h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm font-medium">{likes?.toLocaleString() || 0} likes</span>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div className="p-6 flex-grow text-content-muted text-sm leading-relaxed">
            {description}
          </div>
          
          {/* Footer with link to full shader */}
          <div className="px-6 pb-6 mt-auto">
            <a 
              href={`https://www.shadertoy.com/view/${id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 text-content-primary btn-secondary text-sm font-medium rounded-md transition-colors duration-200"
            >
              <span>View on Shadertoy</span>
              <ExternalLinkIcon className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShaderTile;
