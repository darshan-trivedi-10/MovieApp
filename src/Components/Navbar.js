import React, { Component } from 'react'

export default class navbar extends Component {
    render() {
        return (
            <div style={{ display: 'flex', padding: '0.5' }}>
                <h1>Movies App</h1>
                <h2 style={{ marginLeft: '2rem', marginTop: '1.5rem' }}>Favourities</h2>
            </div>
        )
    }
}
