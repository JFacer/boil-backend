'use strict';

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (req,h) => {
            return 'Response from server';
        }
    },
    {
        method: 'GET',
        path: '/movies',
        handler: (req,h) => {
            return 'List all movies';
        }
    },
    {
        method: 'POST',
        path: '/movies',
        handler: (req,h) => {
            return 'Add new movie';
        }
    },
    {
        method: 'GET',
        path: '/movies/{id}',
        handler: (req,h) => {
            return 'Rerturn a single movie';
        }
    },
    {
        method: 'PUT',
        path: '/movies/{id}',
        handler: (req,h) => {
            return 'Update a single movie';
        }
    },
    {
        method: 'DELETE',
        path: '/movies/{id}',
        handler: (req,h) => {
            return 'Delete a single movie';
        }
    },
    {
        method: 'GET',
        path: '/search',
        handler: (req,h) => {
            return 'Return search result';
        }
    }
];

module.exports = routes;