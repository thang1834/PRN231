import { jwtDecode } from 'jwt-decode';
import React from 'react';
import './Welcome.scss';

const Welcome = () => {
    const accessToken = localStorage.getItem('accessToken');
    const userName = jwtDecode(accessToken).unique_name;

    return (
        <div class="hero-msg">
            <div class="hero-msg-content">
                <h1 class="hero-msg-tag">Welcome {userName},</h1>
                <p>Manage your living space efficiently with our comprehensive building management system.</p>
                <p>
                    Our system provides features such as facility bookings, community announcements, maintenance
                    requests, and more.
                </p>
                <p>
                    Explore the dashboard to access information about upcoming events, community news, and facility
                    availability.
                </p>
                <p>
                    If you need assistance or have any questions, please don't hesitate to reach out to our building
                    management team.
                </p>
                <div class="hero-actions">
                    <button class="showcase hover-effect" onclick="">
                        Showcase
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
