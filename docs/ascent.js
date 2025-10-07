
        const { useState } = React;
        
        const AscentComparison = () => {
            const [activeTab, setActiveTab] = useState('overview');
            const [hoveredVehicle, setHoveredVehicle] = useState(null);
            
            const vehicles = [
                {
                    name: 'Subaru Ascent',
                    year: '2019-2020',
                    winterRating: 10,
                    reliabilityRating: 4,
                    cityMPG: 20,
                    highwayMPG: 26,
                    combinedMPG: 22,
                    seats: 8,
                    groundClearance: 8.7,
                    price: 18000,
                    color: '#FF6B6B',
                    warning: 'NOT RECOMMENDED',
                    pros: [
                        'Excellent AWD with X-Mode',
                        'Seats 7-8 people',
                        '5000 lb towing capacity',
                        'Spacious interior',
                        'Standard safety features'
                    ],
                    cons: [
                        '2019-2020 VERY unreliable',
                        'Poor MPG (worst of all)',
                        'Transmission problems',
                        'Battery/electrical issues',
                        'Too big for most needs',
                        'Expensive to repair'
                    ]
                },
                {
                    name: 'Subaru Outback',
                    year: '2015-2018',
                    winterRating: 10,
                    reliabilityRating: 9,
                    cityMPG: 26,
                    highwayMPG: 32,
                    combinedMPG: 29,
                    seats: 5,
                    groundClearance: 8.7,
                    price: 9500,
                    color: '#4ECDC4',
                    warning: '',
                    pros: [
                        'Best AWD system',
                        'Excellent reliability',
                        'Great highway MPG',
                        'Comfortable ride',
                        'Lower price'
                    ],
                    cons: [
                        'CVT transmission',
                        'Avoid 2013 model',
                        'Seats only 5'
                    ]
                },
                {
                    name: 'Subaru Forester',
                    year: '2016-2018',
                    winterRating: 10,
                    reliabilityRating: 9,
                    cityMPG: 26,
                    highwayMPG: 33,
                    combinedMPG: 29,
                    seats: 5,
                    groundClearance: 8.7,
                    price: 11000,
                    color: '#95E1D3',
                    warning: '',
                    pros: [
                        'Same AWD as Outback',
                        'Best highway MPG',
                        'Great visibility',
                        'Reliable 2016-2018',
                        'Higher seating'
                    ],
                    cons: [
                        'Avoid 2014, 2019',
                        'CVT can be noisy',
                        'Less refined'
                    ]
                },
                {
                    name: 'Mazda CX-5',
                    year: '2016-2020',
                    winterRating: 7,
                    reliabilityRating: 9,
                    cityMPG: 24,
                    highwayMPG: 31,
                    combinedMPG: 27,
                    seats: 5,
                    groundClearance: 8.6,
                    price: 13500,
                    color: '#F38181',
                    warning: '',
                    pros: [
                        'Best driving dynamics',
                        'Upscale interior',
                        'Very reliable',
                        '6-speed auto',
                        'Fun to drive'
                    ],
                    cons: [
                        'AWD not standard',
                        'Less snow capable',
                        'Higher price',
                        'Turbo needs premium'
                    ]
                },
                {
                    name: 'Honda CR-V',
                    year: '2015-2016',
                    winterRating: 6,
                    reliabilityRating: 9,
                    cityMPG: 28,
                    highwayMPG: 34,
                    combinedMPG: 31,
                    seats: 5,
                    groundClearance: 7.8,
                    price: 12000,
                    color: '#AA96DA',
                    warning: '',
                    pros: [
                        'Most reliable',
                        'Best MPG overall',
                        'Spacious interior',
                        'Easy maintenance',
                        'Good value'
                    ],
                    cons: [
                        'Avoid 2017-2018',
                        'AWD less capable',
                        'Lower clearance',
                        'Noisy CVT'
                    ]
                }
            ];
            
            const containerStyle = {
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '20px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                backgroundColor: '#f8f9fa'
            };
            
            const headerStyle = {
                textAlign: 'center',
                color: '#2c3e50',
                marginBottom: '10px',
                fontSize: '32px',
                fontWeight: 'bold'
            };
            
            const subheaderStyle = {
                textAlign: 'center',
                color: '#7f8c8d',
                marginBottom: '30px',
                fontSize: '16px'
            };
            
            const warningBoxStyle = {
                backgroundColor: '#fff3cd',
                border: '3px solid #ffc107',
                borderRadius: '10px',
                padding: '20px',
                marginBottom: '30px',
                textAlign: 'center'
            };
            
            const tabContainerStyle = {
                display: 'flex',
                gap: '10px',
                marginBottom: '30px',
                borderBottom: '2px solid #dee2e6',
                flexWrap: 'wrap'
            };
            
            const tabButtonStyle = (isActive) => ({
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: 'bold',
                border: 'none',
                borderBottom: isActive ? '3px solid #3498db' : 'none',
                backgroundColor: 'transparent',
                color: isActive ? '#3498db' : '#7f8c8d',
                cursor: 'pointer',
                transition: 'all 0.3s',
                outline: 'none'
            });
            
            const cardGridStyle = {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
                marginTop: '20px'
            };
            
            const vehicleCardStyle = (vehicle) => ({
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: vehicle.name === 'Subaru Ascent' 
                    ? '0 8px 16px rgba(255, 0, 0, 0.2)' 
                    : '0 4px 12px rgba(0,0,0,0.1)',
                border: vehicle.name === 'Subaru Ascent' 
                    ? '3px solid #e74c3c' 
                    : '1px solid #e0e0e0',
                transform: hoveredVehicle === vehicle.name ? 'translateY(-5px)' : 'translateY(0)',
                transition: 'all 0.3s',
                cursor: 'pointer'
            });
            
            const badgeStyle = (type) => {
                const styles = {
                    warning: { bg: '#e74c3c', text: 'white' },
                    best: { bg: '#27ae60', text: 'white' },
                    good: { bg: '#3498db', text: 'white' }
                };
                const style = styles[type] || styles.good;
                return {
                    display: 'inline-block',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    backgroundColor: style.bg,
                    color: style.text,
                    fontSize: '12px',
                    fontWeight: 'bold',
                    marginBottom: '15px'
                };
            };
            
            const comparisonTableStyle = {
                width: '100%',
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                overflowX: 'auto'
            };
            
            const tableStyle = {
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '14px'
            };
            
            const thStyle = {
                backgroundColor: '#34495e',
                color: 'white',
                padding: '15px 10px',
                textAlign: 'left',
                fontWeight: 'bold',
                position: 'sticky',
                top: 0
            };
            
            const tdStyle = {
                padding: '12px 10px',
                borderBottom: '1px solid #ecf0f1'
            };
            
            const barChartContainerStyle = {
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                marginBottom: '20px'
            };
            
            const chartTitleStyle = {
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '20px',
                color: '#2c3e50'
            };
            
            const renderBar = (label, value, maxValue, color, unit) => {
                const percentage = (value / maxValue) * 100;
                return React.createElement('div', { 
                    style: { marginBottom: '15px' },
                    key: label
                },
                    React.createElement('div', { 
                        style: { 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            marginBottom: '5px',
                            fontSize: '14px'
                        }
                    },
                        React.createElement('span', { style: { fontWeight: 'bold' } }, label),
                        React.createElement('span', { style: { color: '#7f8c8d' } }, value + ' ' + unit)
                    ),
                    React.createElement('div', {
                        style: {
                            width: '100%',
                            height: '30px',
                            backgroundColor: '#ecf0f1',
                            borderRadius: '15px',
                            overflow: 'hidden',
                            position: 'relative'
                        }
                    },
                        React.createElement('div', {
                            style: {
                                width: percentage + '%',
                                height: '100%',
                                backgroundColor: color,
                                transition: 'width 0.5s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                paddingRight: '10px'
                            }
                        },
                            percentage > 15 && React.createElement('span', {
                                style: {
                                    color: 'white',
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                }
                            }, value + ' ' + unit)
                        )
                    )
                );
            };
            
            const renderOverview = () => {
                return React.createElement('div', null,
                    React.createElement('div', { style: warningBoxStyle },
                        React.createElement('h2', { style: { margin: '0 0 10px 0', color: '#e74c3c' }}, 
                            '⚠️ WARNING: Subaru Ascent NOT Recommended!'
                        ),
                        React.createElement('p', { style: { margin: '0', fontSize: '16px', lineHeight: '1.6' }},
                            'The 2019-2020 Subaru Ascent has POOR reliability with serious transmission, electrical, and battery issues. ',
                            'It also gets the WORST gas mileage of all vehicles. Unless you absolutely need 3 rows and 8 seats, ',
                            'choose the Outback or Forester instead - they\'re cheaper, more reliable, and get better MPG!'
                        )
                    ),
                    
                    React.createElement('h2', { style: { ...chartTitleStyle, textAlign: 'center', marginBottom: '30px' }}, 
                        'Quick Comparison'
                    ),
                    
                    React.createElement('div', { style: cardGridStyle },
                        vehicles.map(vehicle => 
                            React.createElement('div', {
                                key: vehicle.name,
                                style: vehicleCardStyle(vehicle),
                                onMouseEnter: () => setHoveredVehicle(vehicle.name),
                                onMouseLeave: () => setHoveredVehicle(null)
                            },
                                vehicle.warning && React.createElement('div', { style: badgeStyle('warning') }, 
                                    vehicle.warning
                                ),
                                !vehicle.warning && React.createElement('div', { style: badgeStyle('best') }, 
                                    'RECOMMENDED'
                                ),
                                
                                React.createElement('h3', { 
                                    style: { 
                                        color: vehicle.color, 
                                        marginTop: 0,
                                        fontSize: '20px'
                                    }
                                }, vehicle.name),
                                
                                React.createElement('div', { style: { color: '#7f8c8d', marginBottom: '15px' }},
                                    vehicle.year
                                ),
                                
                                React.createElement('div', { 
                                    style: { 
                                        fontSize: '28px', 
                                        fontWeight: 'bold',
                                        color: '#27ae60',
                                        marginBottom: '5px'
                                    }
                                }, '$' + vehicle.price.toLocaleString()),
                                
                                React.createElement('div', { 
                                    style: { 
                                        fontSize: '14px',
                                        color: '#7f8c8d',
                                        marginBottom: '15px'
                                    }
                                }, 'Average price'),
                                
                                React.createElement('div', { 
                                    style: { 
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '10px',
                                        marginTop: '15px',
                                        fontSize: '13px'
                                    }
                                },
                                    React.createElement('div', null,
                                        React.createElement('div', { style: { color: '#7f8c8d' }}, '❄️ Winter'),
                                        React.createElement('div', { style: { fontWeight: 'bold', fontSize: '18px' }}, 
                                            vehicle.winterRating + '/10'
                                        )
                                    ),
                                    React.createElement('div', null,
                                        React.createElement('div', { style: { color: '#7f8c8d' }}, '🔧 Reliability'),
                                        React.createElement('div', { 
                                            style: { 
                                                fontWeight: 'bold', 
                                                fontSize: '18px',
                                                color: vehicle.reliabilityRating < 6 ? '#e74c3c' : '#27ae60'
                                            }
                                        }, vehicle.reliabilityRating + '/10')
                                    ),
                                    React.createElement('div', null,
                                        React.createElement('div', { style: { color: '#7f8c8d' }}, '⛽ Combined'),
                                        React.createElement('div', { style: { fontWeight: 'bold', fontSize: '18px' }}, 
                                            vehicle.combinedMPG + ' MPG'
                                        )
                                    ),
                                    React.createElement('div', null,
                                        React.createElement('div', { style: { color: '#7f8c8d' }}, '🚗 Seats'),
                                        React.createElement('div', { style: { fontWeight: 'bold', fontSize: '18px' }}, 
                                            vehicle.seats
                                        )
                                    )
                                )
                            )
                        )
                    )
                );
            };
            
            const renderWinterComparison = () => {
                return React.createElement('div', null,
                    React.createElement('div', { style: barChartContainerStyle },
                        React.createElement('h3', { style: chartTitleStyle }, '❄️ Winter Performance Rating'),
                        vehicles.map(vehicle => 
                            renderBar(vehicle.name, vehicle.winterRating, 10, vehicle.color, '/10')
                        )
                    ),
                    
                    React.createElement('div', { style: barChartContainerStyle },
                        React.createElement('h3', { style: chartTitleStyle }, '🏔️ Ground Clearance'),
                        vehicles.map(vehicle => 
                            renderBar(vehicle.name, vehicle.groundClearance, 10, vehicle.color, 'inches')
                        )
                    ),
                    
                    React.createElement('div', { 
                        style: { 
                            backgroundColor: '#e8f5e9',
                            borderRadius: '12px',
                            padding: '20px',
                            border: '2px solid #4caf50'
                        }
                    },
                        React.createElement('h3', { style: { marginTop: 0, color: '#2e7d32' }}, 
                            '✅ Winter Performance Summary'
                        ),
                        React.createElement('p', { style: { lineHeight: '1.8', margin: '10px 0' }},
                            React.createElement('strong', null, 'Excellent (10/10): '),
                            'Outback, Forester, Ascent - All have Symmetrical AWD with X-Mode and 8.7" clearance'
                        ),
                        React.createElement('p', { style: { lineHeight: '1.8', margin: '10px 0' }},
                            React.createElement('strong', null, 'Good (7/10): '),
                            'CX-5 - AWD available, 8.6" clearance, but not as winter-focused'
                        ),
                        React.createElement('p', { style: { lineHeight: '1.8', margin: '10px 0' }},
                            React.createElement('strong', null, 'Average (6/10): '),
                            'CR-V - AWD is part-time, only 7.8" clearance'
                        ),
                        React.createElement('div', { 
                            style: { 
                                marginTop: '20px',
                                padding: '15px',
                                backgroundColor: 'white',
                                borderRadius: '8px'
                            }
                        },
                            React.createElement('strong', null, '🏆 Winter Winner: '),
                            'Outback & Forester are BETTER choices than Ascent - same winter capability, more reliable, better MPG!'
                        )
                    )
                );
            };
            
            const renderReliability = () => {
                return React.createElement('div', null,
                    React.createElement('div', { style: barChartContainerStyle },
                        React.createElement('h3', { style: chartTitleStyle }, '🔧 Reliability Rating (2012-2020)'),
                        vehicles.map(vehicle => 
                            renderBar(vehicle.name, vehicle.reliabilityRating, 10, 
                                vehicle.reliabilityRating < 6 ? '#e74c3c' : vehicle.color, '/10')
                        )
                    ),
                    
                    React.createElement('div', { 
                        style: { 
                            backgroundColor: '#ffebee',
                            borderRadius: '12px',
                            padding: '20px',
                            border: '3px solid #e74c3c',
                            marginBottom: '20px'
                        }
                    },
                        React.createElement('h3', { style: { marginTop: 0, color: '#c62828' }}, 
                            '🚫 Subaru Ascent Reliability Issues'
                        ),
                        React.createElement('p', { style: { fontWeight: 'bold', marginBottom: '10px' }},
                            'The 2019-2020 Ascent is one of the LEAST reliable Subarus:'
                        ),
                        React.createElement('ul', { style: { lineHeight: '1.8', paddingLeft: '25px' }},
                            React.createElement('li', null, '⚠️ Transmission problems (CVT issues, slipping)'),
                            React.createElement('li', null, '🔋 Severe battery draining problems'),
                            React.createElement('li', null, '⚡ Widespread electrical issues'),
                            React.createElement('li', null, '🔍 Check engine lights at low mileage (~5,000 miles)'),
                            React.createElement('li', null, '💰 Expensive sensor replacements ($350-600+)'),
                            React.createElement('li', null, '📱 Infotainment system failures')
                        ),
                        React.createElement('p', { 
                            style: { 
                                marginTop: '15px',
                                padding: '15px',
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                fontWeight: 'bold'
                            }
                        }, '💡 Consumer Reports and multiple sources rate the 2019 Ascent as having below-average reliability')
                    ),
                    
                    React.createElement('div', { 
                        style: { 
                            backgroundColor: '#e8f5e9',
                            borderRadius: '12px',
                            padding: '20px',
                            border: '2px solid #4caf50'
                        }
                    },
                        React.createElement('h3', { style: { marginTop: 0, color: '#2e7d32' }}, 
                            '✅ Better Reliability Choices'
                        ),
                        React.createElement('div', { style: { lineHeight: '1.8' }},
                            React.createElement('p', null,
                                React.createElement('strong', null, '🥇 Best: '),
                                'CR-V, Outback, Forester, CX-5 (all 9/10) - Proven track records'
                            ),
                            React.createElement('p', null,
                                React.createElement('strong', null, '⚠️ Worst: '),
                                'Ascent 2019-2020 (4/10) - Avoid these years completely'
                            ),
                            React.createElement('p', { 
                                style: { 
                                    marginTop: '15px',
                                    padding: '15px',
                                    backgroundColor: '#fff',
                                    borderRadius: '8px'
                                }
                            },
                                React.createElement('strong', null, '📝 Note: '),
                                '2021+ Ascent models improved significantly, but 2019-2020 should be avoided'
                            )
                        )
                    )
                );
            };
            
            const renderMPG = () => {
                return React.createElement('div', null,
                    React.createElement('div', { style: barChartContainerStyle },
                        React.createElement('h3', { style: chartTitleStyle }, '🛣️ Highway MPG (Most Important for You)'),
                        vehicles.map(vehicle => 
                            renderBar(vehicle.name, vehicle.highwayMPG, 35, vehicle.color, 'MPG')
                        )
                    ),
                    
                    React.createElement('div', { style: barChartContainerStyle },
                        React.createElement('h3', { style: chartTitleStyle }, '🏙️ City MPG'),
                        vehicles.map(vehicle => 
                            renderBar(vehicle.name, vehicle.cityMPG, 30, vehicle.color, 'MPG')
                        )
                    ),
                    
                    React.createElement('div', { style: barChartContainerStyle },
                        React.createElement('h3', { style: chartTitleStyle }, '⚖️ Combined MPG'),
                        vehicles.map(vehicle => 
                            renderBar(vehicle.name, vehicle.combinedMPG, 35, vehicle.color, 'MPG')
                        )
                    ),
                    
                    React.createElement('div', { 
                        style: { 
                            backgroundColor: '#fff3e0',
                            borderRadius: '12px',
                            padding: '20px',
                            border: '2px solid #ff9800'
                        }
                    },
                        React.createElement('h3', { style: { marginTop: 0, color: '#e65100' }}, 
                            '⛽ MPG Analysis'
                        ),
                        React.createElement('div', { style: { lineHeight: '1.8' }},
                            React.createElement('p', null,
                                React.createElement('strong', null, '🥇 Best Highway: '),
                                'CR-V (34 MPG) and Forester (33 MPG) - Best for your highway commute'
                            ),
                            React.createElement('p', null,
                                React.createElement('strong', null, '🥈 Good Balance: '),
                                'Outback (32 MPG) and CX-5 (31 MPG) - Excellent balance of winter + MPG'
                            ),
                            React.createElement('p', null,
                                React.createElement('strong', null, '❌ Worst: '),
                                'Ascent (26 MPG highway, 22 combined) - WORST fuel economy!'
                            ),
                            React.createElement('div', { 
                                style: { 
                                    marginTop: '20px',
                                    padding: '15px',
                                    backgroundColor: '#e74c3c',
                                    color: 'white',
                                    borderRadius: '8px',
                                    fontWeight: 'bold'
                                }
                            },
                                '💸 Annual Fuel Cost Difference: ',
                                'Ascent costs ~$700 MORE per year than CR-V at 15,000 miles/year!'
                            ),
                            React.createElement('p', { style: { marginTop: '15px', fontStyle: 'italic' }},
                                'The Ascent is bigger and heavier (turbo 4-cyl), so it drinks more gas. ',
                                'Unless you need 8 seats, you\'re wasting money on fuel.'
                            )
                        )
                    )
                );
            };
            
            const renderDetailedTable = () => {
                return React.createElement('div', { style: comparisonTableStyle },
                    React.createElement('h3', { style: chartTitleStyle }, 'Complete Side-by-Side Comparison'),
                    React.createElement('table', { style: tableStyle },
                        React.createElement('thead', null,
                            React.createElement('tr', null,
                                React.createElement('th', { style: thStyle }, 'Category'),
                                vehicles.map(v => 
                                    React.createElement('th', { 
                                        key: v.name, 
                                        style: { ...thStyle, backgroundColor: v.color }
                                    }, v.name)
                                )
                            )
                        ),
                        React.createElement('tbody', null,
                            React.createElement('tr', null,
                                React.createElement('td', { style: { ...tdStyle, fontWeight: 'bold' }}, 'Price'),
                                vehicles.map(v => 
                                    React.createElement('td', { key: v.name, style: tdStyle }, 
                                        '$' + v.price.toLocaleString()
                                    )
                                )
                            ),
                            React.createElement('tr', null,
                                React.createElement('td', { style: { ...tdStyle, fontWeight: 'bold' }}, 'Winter Rating'),
                                vehicles.map(v => 
                                    React.createElement('td', { key: v.name, style: tdStyle }, 
                                        v.winterRating + '/10'
                                    )
                                )
                            ),
                            React.createElement('tr', null,
                                React.createElement('td', { style: { ...tdStyle, fontWeight: 'bold' }}, 'Reliability'),
                                vehicles.map(v => 
                                    React.createElement('td', { 
                                        key: v.name, 
                                        style: { 
                                            ...tdStyle,
                                            color: v.reliabilityRating < 6 ? '#e74c3c' : '#27ae60',
                                            fontWeight: 'bold'
                                        }
                                    }, v.reliabilityRating + '/10')
                                )
                            ),
                            React.createElement('tr', null,
                                React.createElement('td', { style: { ...tdStyle, fontWeight: 'bold' }}, 'Highway MPG'),
                                vehicles.map(v => 
                                    React.createElement('td', { key: v.name, style: tdStyle }, 
                                        v.highwayMPG + ' MPG'
                                    )
                                )
                            ),
                            React.createElement('tr', null,
                                React.createElement('td', { style: { ...tdStyle, fontWeight: 'bold' }}, 'Combined MPG'),
                                vehicles.map(v => 
                                    React.createElement('td', { key: v.name, style: tdStyle }, 
                                        v.combinedMPG + ' MPG'
                                    )
                                )
                            ),
                            React.createElement('tr', null,
                                React.createElement('td', { style: { ...tdStyle, fontWeight: 'bold' }}, 'Seating'),
                                vehicles.map(v => 
                                    React.createElement('td', { key: v.name, style: tdStyle }, 
                                        v.seats + ' seats'
                                    )
                                )
                            ),
                            React.createElement('tr', null,
                                React.createElement('td', { style: { ...tdStyle, fontWeight: 'bold' }}, 'Ground Clearance'),
                                vehicles.map(v => 
                                    React.createElement('td', { key: v.name, style: tdStyle }, 
                                        v.groundClearance + '"'
                                    )
                                )
                            ),
                            React.createElement('tr', null,
                                React.createElement('td', { style: { ...tdStyle, fontWeight: 'bold' }}, 'Best For'),
                                React.createElement('td', { style: { ...tdStyle, color: '#e74c3c' }}, 
                                    'Large families ONLY'
                                ),
                                React.createElement('td', { style: { ...tdStyle, color: '#27ae60' }}, 
                                    'Cold climate + highway'
                                ),
                                React.createElement('td', { style: tdStyle }, 
                                    'Cold climate + visibility'
                                ),
                                React.createElement('td', { style: tdStyle }, 
                                    'Driving dynamics'
                                ),
                                React.createElement('td', { style: tdStyle }, 
                                    'Best MPG'
                                )
                            )
                        )
                    ),
                    
                    React.createElement('div', { 
                        style: { 
                            marginTop: '30px',
                            padding: '20px',
                            backgroundColor: '#e3f2fd',
                            borderRadius: '8px',
                            border: '2px solid #2196f3'
                        }
                    },
                        React.createElement('h4', { style: { marginTop: 0 }}, '🎯 Final Verdict'),
                        React.createElement('p', { style: { lineHeight: '1.8', margin: '10px 0' }},
                            React.createElement('strong', null, 'For cold climate + highway + under $15k: '),
                            'Choose Outback (2015-2018) or Forester (2016-2018)'
                        ),
                        React.createElement('p', { style: { lineHeight: '1.8', margin: '10px 0' }},
                            React.createElement('strong', null, 'Avoid Ascent because: '),
                            'Poor reliability, worst MPG, more expensive, too big for most needs'
                        ),
                        React.createElement('p', { style: { lineHeight: '1.8', margin: '10px 0' }},
                            React.createElement('strong', null, 'Only choose Ascent if: '),
                            'You absolutely need 7-8 seats AND can afford 2021+ model ($25,000+)'
                        )
                    )
                );
            };
            
            return React.createElement('div', { style: containerStyle },
                React.createElement('h1', { style: headerStyle }, 
                    '🚗 Subaru Ascent vs Winter Vehicles'
                ),
                React.createElement('div', { style: subheaderStyle },
                    'How does the 3-row Ascent compare for winter, reliability, and gas mileage?'
                ),
                
                React.createElement('div', { style: tabContainerStyle },
                    ['overview', 'winter', 'reliability', 'mpg', 'table'].map(tab => 
                        React.createElement('button', {
                            key: tab,
                            style: tabButtonStyle(activeTab === tab),
                            onClick: () => setActiveTab(tab),
                            onMouseEnter: (e) => {
                                if (activeTab !== tab) {
                                    e.target.style.color = '#3498db';
                                }
                            },
                            onMouseLeave: (e) => {
                                if (activeTab !== tab) {
                                    e.target.style.color = '#7f8c8d';
                                }
                            }
                        }, tab.charAt(0).toUpperCase() + tab.slice(1).replace('mpg', 'MPG'))
                    )
                ),
                
                activeTab === 'overview' && renderOverview(),
                activeTab === 'winter' && renderWinterComparison(),
                activeTab === 'reliability' && renderReliability(),
                activeTab === 'mpg' && renderMPG(),
                activeTab === 'table' && renderDetailedTable()
            );
        };
        
        ReactDOM.render(React.createElement(AscentComparison), document.getElementById('react-root'));
