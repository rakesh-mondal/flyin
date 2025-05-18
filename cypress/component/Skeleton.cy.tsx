import React from 'react';
import { Skeleton } from '../../src/components/ui/skeleton';

describe('Skeleton Component', () => {
  it('renders with default styling and takes Percy snapshot', () => {
    cy.mount(
      <div className="p-8 bg-white space-y-4">
        <Skeleton className="h-8 w-full" />
      </div>
    );
    
    // Check if skeleton is visible with the expected classes
    cy.get('.animate-pulse').should('be.visible');
    cy.get('.bg-muted').should('be.visible');
    
    // Take a Percy snapshot
    cy.percySnapshot('Skeleton - Default');
  });

  it('renders with custom sizes and shapes', () => {
    cy.mount(
      <div className="p-8 bg-white space-y-4">
        {/* Text line skeletons */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        
        {/* Card skeleton */}
        <div className="flex gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    );
    
    // Take a Percy snapshot
    cy.percySnapshot('Skeleton - Multiple Variations');
  });

  it('renders skeleton loading card', () => {
    cy.mount(
      <div className="p-8 bg-white">
        <div className="rounded-md border p-4">
          <div className="flex gap-4">
            <Skeleton className="h-16 w-16 rounded-md" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="mt-4 flex justify-end">
            <Skeleton className="h-8 w-20 rounded-md" />
          </div>
        </div>
      </div>
    );
    
    // Take a Percy snapshot
    cy.percySnapshot('Skeleton - Loading Card');
  });
}); 