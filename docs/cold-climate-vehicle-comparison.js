// Cold Climate Vehicle Comparison - React Component
// Paste this code into the admin panel for React content type

const { useState } = React;

const VehicleComparison = () => {
  const [activeTab, setActiveTab] = useState('recommended');

  // Updated MPG data including better options for highway/snow
  const mpgData = [
    { year: '2012', Forester: 27, Outback: 27, CRV: 26, RAV4: 24, 'CX-5': 28 },
    { year: '2013', Forester: 27, Outback: 27, CRV: 27, RAV4: 24, 'CX-5': 28 },
    { year: '2014', Forester: 28, Outback: 28, CRV: 27, RAV4: 25, 'CX-5': 28 },
    { year: '2015', Forester: 28, Outback: 28, CRV: 28, RAV4: 25, 'CX-5': 28 },
    { year: '2016', Forester: 28, Outback: 28, CRV: 29, RAV4: 25, 'CX-5': 28 },
    { year: '2017', Forester: 28, Outback: 28, CRV: 29, RAV4: 25, 'CX-5': 29 },
    { year: '2018', Forester: 29, Outback: 29, CRV: 29, RAV4: 26, 'CX-5': 29 },
    { year: '2019', Forester: 29, Outback: 29, CRV: 29, RAV4: 28, 'CX-5': 28 },
    { year: '2020', Forester: 29, Outback: 29, CRV: 29, RAV4: 28, 'CX-5': 28 },
  ];

  // Highway MPG specifically (more relevant for user)
  const highwayMpgData = [
    { vehicle: 'Outback', highway: 32 },
    { vehicle: 'Forester', highway: 33 },
    { vehicle: 'CX-5', highway: 31 },
    { vehicle: 'CR-V', highway: 34 },
    { vehicle: 'RAV4', highway: 35 },
    { vehicle: 'Crosstrek', highway: 33 },
  ];

  // Reliability + snow capability (out of 10)
  const snowReliabilityData = [
    { vehicle: 'Outback', snow: 10, reliability: 9 },
    { vehicle: 'Forester', snow: 10, reliability: 9 },
    { vehicle: 'CX-5', snow: 7, reliability: 8 },
    { vehicle: 'CR-V', snow: 6, reliability: 9 },
    { vehicle: 'RAV4', snow: 7, reliability: 8 },
    { vehicle: 'Crosstrek', snow: 9, reliability: 8 },
  ];

  const topRecommendations = [
    {
      name: '🏆 Subaru Outback (2015-2018)',
      rank: 1,
      whyBest: 'BEST OVERALL CHOICE for your needs',
      pros: [
        'Standard AWD on ALL models (Symmetrical AWD - best in class)',
        'Excellent highway MPG: 32 MPG highway (best for long trips)',
        '8.7-9.5" ground clearance (handles deep snow easily)',
        'Legendary winter performance and reliability',
        'Larger cargo space than Forester (75.6 cu ft)',
        'More comfortable for highway cruising than SUVs',
        'X-Mode for enhanced snow/ice traction',
        '2015-2018 are most reliable years (avoid 2013!)'
      ],
      cons: [
        '2013 model has major oil consumption issues - AVOID',
        'CVT transmission (some prefer traditional automatic)',
        'Slightly lower than SUV seating position',
        'Higher repair costs than Honda/Toyota'
      ],
      bestYears: '2015, 2016, 2017, 2018',
      avoidYears: '2013 (oil consumption issues)',
      winterRating: '10/10'
    },
    {
      name: '🥈 Subaru Forester (2016-2018)',
      rank: 2,
      whyBest: 'EXCELLENT ALTERNATIVE - Best visibility',
      pros: [
        'Standard AWD on ALL models (same system as Outback)',
        'Best-in-class visibility for winter driving',
        'Slightly better highway MPG: 33 MPG highway',
        'Higher seating position than Outback',
        '8.7" ground clearance (excellent for snow)',
        'Easier to park and maneuver',
        'Very reliable 2016-2018 models',
        'More traditional SUV feel'
      ],
      cons: [
        'Less cargo space than Outback (68.8 cu ft)',
        'Avoid 2014 (oil consumption) and 2019 (windshield issues)',
        'CVT can be noisy',
        'Slightly less highway-refined than Outback'
      ],
      bestYears: '2016, 2017, 2018, 2020',
      avoidYears: '2014 (excessive oil use), 2019 (windshield cracks)',
      winterRating: '10/10'
    },
    {
      name: '🥉 Mazda CX-5 (2016-2020)',
      rank: 3,
      whyBest: 'BEST DRIVING DYNAMICS',
      pros: [
        'AWD available - excellent winter performance',
        'Highway MPG: 31 MPG (base) / 30 MPG (turbo)',
        'Most refined and fun to drive',
        'Upscale interior quality',
        'Excellent reliability record',
        '6-speed automatic (not CVT!) - smoother highway cruising',
        'Premium feel at non-premium price'
      ],
      cons: [
        'AWD not standard on all trims (must verify)',
        'Slightly less ground clearance than Subarus (8.6")',
        'Smaller cargo space than competitors',
        'Not quite as snow-capable as Subarus',
        'Turbo models require premium fuel'
      ],
      bestYears: '2017, 2018, 2019, 2020',
      avoidYears: 'None - all years reliable',
      winterRating: '7/10'
    }
  ];

  const sedanComparison = [
    {
      name: 'Why NOT the Camry/Camry Hybrid?',
      reason: 'Wrong vehicle type for your needs',
      issues: [
        '❌ NO AWD until 2020 (FWD terrible in snow)',
        '❌ Low ground clearance - gets stuck in snow',
        '❌ Sedan body style impractical in winter',
        '❌ Not designed for winter climate driving',
        '✓ Would only consider 2020 Camry AWD, but still compromised'
      ]
    },
    {
      name: 'Why MAYBE the CR-V?',
      reason: 'Good but not ideal for heavy snow',
      issues: [
        '✓ Excellent reliability (except 2017-2018 oil dilution)',
        '✓ Best highway MPG for SUV: 34 MPG',
        '✓ Most interior space',
        '⚠️ AWD available but not as capable as Subaru',
        '⚠️ Lower ground clearance (7.8") than Subarus',
        '⚠️ AWD system less sophisticated for deep snow',
        '✓ Best years: 2015-2016, 2019-2020'
      ]
    },
    {
      name: 'Why MAYBE the RAV4?',
      reason: 'Decent but reliability concerns',
      issues: [
        '✓ AWD available, decent snow capability',
        '⚠️ 2019-2020 have significant reliability issues',
        '⚠️ Ride can be harsh on highway',
        '⚠️ Road noise on highway',
        '✓ Best years: 2016-2018 (before redesign)',
        '⚠️ Not as winter-focused as Subarus'
      ]
    },
    {
      name: 'Subaru Crosstrek',
      reason: 'Good but underpowered for highway',
      issues: [
        '✓ Excellent AWD and snow capability (9/10)',
        '✓ Best ground clearance: 8.7"',
        '⚠️ Base engine very slow (148 hp) - struggles on highway',
        '⚠️ Smaller and less comfortable for long trips',
        '⚠️ Less cargo space than others',
        '✓ Good if you prioritize snow over highway comfort',
        '✓ Best years: 2018-2020'
      ]
    }
  ];

  // Simple bar chart component
  const SimpleBarChart = ({ data, dataKey, label }) => {
    const maxValue = Math.max(...data.map(d => d[dataKey]));

    return (
      <div style={{ padding: '20px' }}>
        {data.map((item, index) => (
          <div key={index} style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ width: '120px', fontSize: '14px', fontWeight: '500' }}>{item.vehicle}</span>
              <div style={{
                flex: 1,
                height: '30px',
                backgroundColor: '#4CAF50',
                width: `${(item[dataKey] / maxValue) * 100}%`,
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '8px',
                color: 'white',
                fontWeight: 'bold'
              }}>
                {item[dataKey]} {label}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Grouped bar chart for snow vs reliability
  const GroupedBarChart = ({ data }) => {
    const maxValue = 10;

    return (
      <div style={{ padding: '20px' }}>
        {data.map((item, index) => (
          <div key={index} style={{ marginBottom: '24px' }}>
            <div style={{ fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>{item.vehicle}</div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ width: '80px', fontSize: '12px' }}>Snow:</span>
              <div style={{
                height: '24px',
                backgroundColor: '#2196F3',
                width: `${(item.snow / maxValue) * 100}%`,
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '8px',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '12px'
              }}>
                {item.snow}/10
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
              <span style={{ width: '80px', fontSize: '12px' }}>Reliability:</span>
              <div style={{
                height: '24px',
                backgroundColor: '#4CAF50',
                width: `${(item.reliability / maxValue) * 100}%`,
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '8px',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '12px'
              }}>
                {item.reliability}/10
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const buttonStyle = (isActive) => ({
    padding: '12px 16px',
    fontWeight: '600',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: isActive ? '2px solid #2563eb' : 'none',
    color: isActive ? '#2563eb' : '#4b5563',
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  });

  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '24px', backgroundColor: '#f9fafb' }}>
      <h1 style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center', marginBottom: '16px', color: '#1f2937' }}>
        Vehicle Comparison: Cold Climate + Highway Miles
      </h1>
      <p style={{ textAlign: 'center', color: '#4b5563', marginBottom: '32px', fontSize: '18px' }}>
        Updated recommendations for snow/winter driving with highway focus
      </p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid #d1d5db', overflowX: 'auto' }}>
        <button onClick={() => setActiveTab('recommended')} style={buttonStyle(activeTab === 'recommended')}>
          🏆 Top 3 For You
        </button>
        <button onClick={() => setActiveTab('why-not-others')} style={buttonStyle(activeTab === 'why-not-others')}>
          Why Not Others?
        </button>
        <button onClick={() => setActiveTab('highway-mpg')} style={buttonStyle(activeTab === 'highway-mpg')}>
          Highway MPG
        </button>
        <button onClick={() => setActiveTab('snow-rating')} style={buttonStyle(activeTab === 'snow-rating')}>
          Snow Performance
        </button>
      </div>

      {activeTab === 'recommended' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ backgroundColor: '#f0fdf4', border: '2px solid #22c55e', borderRadius: '8px', padding: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#166534', marginBottom: '12px' }}>
              ⚡ Quick Answer: Subaru Outback 2015-2018
            </h2>
            <p style={{ fontSize: '18px', marginBottom: '8px' }}>
              <strong>For cold climate + highway miles, the Subaru Outback (2015-2018) is your BEST choice.</strong>
            </p>
            <p style={{ color: '#374151' }}>
              It has standard AWD (better than Honda/Toyota), excellent highway MPG (32), high ground clearance,
              and is specifically engineered for winter driving. The Camry and Camry Hybrid are wrong vehicles
              for snowy conditions - they're FWD sedans with low ground clearance.
            </p>
          </div>

          {topRecommendations.map((vehicle, index) => (
            <div key={index} style={{ backgroundColor: 'white', border: '2px solid #d1d5db', borderRadius: '8px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1d4ed8' }}>{vehicle.name}</h3>
                <span style={{ fontSize: '36px' }}>{index === 0 ? '🏆' : index === 1 ? '🥈' : '🥉'}</span>
              </div>

              <div style={{ backgroundColor: '#eff6ff', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
                <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#1e40af' }}>{vehicle.whyBest}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <h4 style={{ fontWeight: 'bold', color: '#16a34a', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '8px' }}>✓</span> PROS
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {vehicle.pros.map((pro, i) => (
                      <li key={i} style={{ fontSize: '14px', color: '#374151', paddingLeft: '16px', marginBottom: '4px' }}>• {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 style={{ fontWeight: 'bold', color: '#dc2626', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '8px' }}>✗</span> CONS
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {vehicle.cons.map((con, i) => (
                      <li key={i} style={{ fontSize: '14px', color: '#374151', paddingLeft: '16px', marginBottom: '4px' }}>• {con}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '16px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                <div>
                  <p style={{ fontSize: '12px', color: '#4b5563', fontWeight: '600' }}>BEST YEARS</p>
                  <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#16a34a' }}>{vehicle.bestYears}</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#4b5563', fontWeight: '600' }}>AVOID YEARS</p>
                  <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#dc2626' }}>{vehicle.avoidYears}</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#4b5563', fontWeight: '600' }}>WINTER RATING</p>
                  <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#2563eb' }}>{vehicle.winterRating}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'why-not-others' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ backgroundColor: '#fef3c7', border: '2px solid #eab308', borderRadius: '8px', padding: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#854d0e', marginBottom: '8px' }}>
              Why Your Original List Wasn't Ideal
            </h2>
            <p style={{ color: '#374151' }}>
              The Camry and Camry Hybrid are excellent sedans, but they're <strong>completely wrong</strong> for
              cold climate + highway + snow. They're FWD with low ground clearance. The SUVs you listed
              are better, but Subarus are specifically engineered for winter/snow conditions with superior AWD systems.
            </p>
          </div>

          {sedanComparison.map((vehicle, index) => (
            <div key={index} style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #d1d5db' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#1f2937' }}>{vehicle.name}</h3>
              <p style={{ fontSize: '14px', color: '#6b7280', fontStyle: 'italic', marginBottom: '12px' }}>{vehicle.reason}</p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {vehicle.issues.map((issue, i) => (
                  <li key={i} style={{
                    fontSize: '14px',
                    padding: '8px',
                    borderRadius: '4px',
                    backgroundColor: issue.startsWith('✓') ? '#f0fdf4' : issue.startsWith('⚠️') ? '#fef3c7' : '#fee2e2'
                  }}>
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'highway-mpg' && (
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#1f2937' }}>Highway MPG Comparison (2016-2020)</h2>
          <SimpleBarChart data={highwayMpgData} dataKey="highway" label="MPG" />

          <div style={{ marginTop: '24px', backgroundColor: '#eff6ff', padding: '16px', borderRadius: '8px' }}>
            <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>Highway Driving Analysis</h3>
            <p style={{ fontSize: '14px', marginBottom: '12px' }}>
              Since you drive <strong>mostly highway miles</strong>, MPG and comfort matter most:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px' }}>
              <li style={{ marginBottom: '4px' }}><strong>Best Highway MPG:</strong> RAV4 (35) and CR-V (34) - but poorer snow capability</li>
              <li style={{ marginBottom: '4px' }}><strong>Best Balance:</strong> Forester (33), Outback (32) - excellent MPG + best snow/AWD</li>
              <li style={{ marginBottom: '4px' }}><strong>Sweetspot:</strong> CX-5 (31) - great handling, refined, good winter capability</li>
              <li style={{ marginBottom: '4px' }}><strong>Skip:</strong> Crosstrek slower/less comfortable on highway despite good MPG</li>
            </ul>
          </div>

          <div style={{ marginTop: '16px', backgroundColor: '#f0fdf4', padding: '16px', borderRadius: '8px' }}>
            <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>💡 Pro Tip for Highway Driving</h3>
            <p style={{ fontSize: '14px' }}>
              The Outback is more highway-refined than the Forester (lower, wagon-like design).
              If you do 70%+ highway, choose Outback. If 50/50 city/highway, Forester's higher position helps.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'snow-rating' && (
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#1f2937' }}>Snow/Winter Performance Ratings</h2>
          <GroupedBarChart data={snowReliabilityData} />

          <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            <div style={{ backgroundColor: '#eff6ff', padding: '16px', borderRadius: '8px' }}>
              <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>❄️ Why Subaru Dominates in Snow</h3>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px' }}>
                <li style={{ marginBottom: '4px' }}>• <strong>Symmetrical AWD:</strong> Power split 60/40 (front/rear) always engaged</li>
                <li style={{ marginBottom: '4px' }}>• <strong>Ground clearance:</strong> 8.7-9.5" vs 6-8" competitors</li>
                <li style={{ marginBottom: '4px' }}>• <strong>X-Mode:</strong> Optimizes traction in deep snow/ice</li>
                <li style={{ marginBottom: '4px' }}>• <strong>Hill Descent Control:</strong> Safer on icy hills</li>
                <li style={{ marginBottom: '4px' }}>• <strong>All-weather engineering:</strong> Designed in Japan for snow country</li>
              </ul>
            </div>

            <div style={{ backgroundColor: '#fef3c7', padding: '16px', borderRadius: '8px' }}>
              <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>⚠️ Why Others Are Weaker</h3>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px' }}>
                <li style={{ marginBottom: '4px' }}>• <strong>CR-V/RAV4:</strong> AWD is part-time, primarily FWD until slip detected</li>
                <li style={{ marginBottom: '4px' }}>• <strong>CX-5:</strong> Good AWD but less ground clearance</li>
                <li style={{ marginBottom: '4px' }}>• <strong>Camry:</strong> FWD with 5.7" clearance - absolutely terrible in snow</li>
                <li style={{ marginBottom: '4px' }}>• <strong>Lower priority:</strong> Honda/Toyota AWD designed for light snow, not harsh winters</li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '16px', backgroundColor: '#fee2e2', border: '2px solid #f87171', padding: '16px', borderRadius: '8px' }}>
            <h3 style={{ fontWeight: 'bold', fontSize: '18px', color: '#991b1b', marginBottom: '8px' }}>🚫 Critical: Avoid FWD Sedans in Snow</h3>
            <p style={{ fontSize: '14px', color: '#1f2937' }}>
              The Camry and Camry Hybrid (2012-2019) are <strong>front-wheel drive only</strong>.
              In cold climates with snow, FWD sedans with low ground clearance will get stuck, slide on ice,
              and struggle in winter. Even the 2020 Camry AWD is compromised - it's still a low sedan.
              <strong style={{ color: '#991b1b' }}> For your climate, skip all sedans and get an AWD SUV/wagon.</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<VehicleComparison />, document.getElementById('react-root'));
