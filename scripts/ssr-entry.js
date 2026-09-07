/**
 * Loaded through Vite's SSR pipeline by `smoke-render.mjs` so React, the server
 * renderer, the router and the app components all resolve to the same module
 * instances. Importing them straight from Node would load a second React.
 */
import React from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

export { React, renderToString, MemoryRouter, Route, Routes }
