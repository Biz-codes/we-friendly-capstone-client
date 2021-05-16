import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
    return (
        <div className="landing">
            <div className='hook'>
                <p>Are you DIY-Fabulous?!</p>
                <p>Of couse you are!</p>
                <p>What about DIY-Organized?</p>
                <p>...</p>
                <p>When you start a project, do you find yourself scrambling to figure out what supplies you have around before you can get started?</p>
                <p>Welcome to the virtual filing cabinet you have been needing to keep track of all your DIY supplies, tools and projects!</p>
                <p>Whether you are a DIY Builder, Crafter, Artiste, etcetera, a My DIY Inventory account will lessen your stressin' when organizing your projects,</p>
                <p>freeing up your creative brain to enjoy</p>
                <p>Doin' It Yourself!!!</p>
            </div>
            <div className='buttons'>
                <button>Sign Up Link</button>
                <button>Demo Link</button>
                <button>Log In Link</button>
            </div>
        </div>
    )
}