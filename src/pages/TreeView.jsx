import React, { useState } from 'react';
import { Search, Filter, ZoomIn, ZoomOut, Users, Award, ChevronDown, ChevronRight, Plus, Minus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useMLM } from '../contexts/MLMContext.jsx';

const TreeView = () => {
  const { user } = useAuth();
  const { getUserTree } = useMLM();
  const [viewMode, setViewMode] = useState('tree'); // 'tree' or 'table'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRank, setFilterRank] = useState('all');
  const [expandedNodes, setExpandedNodes] = useState(new Set(['user001', 'user002'])); // Default expanded nodes

  const userTree = getUserTree(user?.id || '');

  // Enhanced demo tree data with more realistic structure
  const enhancedTreeData = {
    id: user?.id || 'user001',
    name: user?.name || 'John Doe',
    rank: user?.rank || 'Bronze',
    earnings: user?.totalEarnings || 1000,
    teamSize: (user?.leftLegCount || 0) + (user?.rightLegCount || 0),
    profilePhoto: user?.profilePhoto || 'https://ui-avatars.com/api/?name=John+Doe&background=1e3a8a&color=fff',
    children: [
      {
        id: 'user003',
        name: 'Alice Johnson',
        rank: 'Silver',
        earnings: 2500,
        teamSize: 8,
        profilePhoto: 'https://ui-avatars.com/api/?name=Alice+Johnson&background=10b981&color=fff',
        children: [
          {
            id: 'user007',
            name: 'Bob Wilson',
            rank: 'Bronze',
            earnings: 800,
            teamSize: 2,
            profilePhoto: 'https://ui-avatars.com/api/?name=Bob+Wilson&background=f59e0b&color=fff',
            children: [
              {
                id: 'user015',
                name: 'Sarah Chen',
                rank: 'Bronze',
                earnings: 300,
                teamSize: 0,
                profilePhoto: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=1e3a8a&color=fff'
              },
              {
                id: 'user016',
                name: 'Mike Torres',
                rank: 'Bronze',
                earnings: 450,
                teamSize: 1,
                profilePhoto: 'https://ui-avatars.com/api/?name=Mike+Torres&background=10b981&color=fff'
              }
            ]
          },
          {
            id: 'user008',
            name: 'Carol Davis',
            rank: 'Gold',
            earnings: 5200,
            teamSize: 12,
            profilePhoto: 'https://ui-avatars.com/api/?name=Carol+Davis&background=f59e0b&color=fff',
            children: [
              {
                id: 'user017',
                name: 'David Kim',
                rank: 'Silver',
                earnings: 1800,
                teamSize: 4,
                profilePhoto: 'https://ui-avatars.com/api/?name=David+Kim&background=1e3a8a&color=fff'
              },
              {
                id: 'user018',
                name: 'Lisa Wang',
                rank: 'Bronze',
                earnings: 650,
                teamSize: 2,
                profilePhoto: 'https://ui-avatars.com/api/?name=Lisa+Wang&background=10b981&color=fff'
              }
            ]
          }
        ]
      },
      {
        id: 'user004',
        name: 'Mike Brown',
        rank: 'Gold',
        earnings: 4800,
        teamSize: 15,
        profilePhoto: 'https://ui-avatars.com/api/?name=Mike+Brown&background=f59e0b&color=fff',
        children: [
          {
            id: 'user009',
            name: 'David Lee',
            rank: 'Silver',
            earnings: 2200,
            teamSize: 6,
            profilePhoto: 'https://ui-avatars.com/api/?name=David+Lee&background=1e3a8a&color=fff',
            children: [
              {
                id: 'user019',
                name: 'Jennifer Lopez',
                rank: 'Bronze',
                earnings: 750,
                teamSize: 1,
                profilePhoto: 'https://ui-avatars.com/api/?name=Jennifer+Lopez&background=10b981&color=fff'
              },
              {
                id: 'user020',
                name: 'Robert Taylor',
                rank: 'Silver',
                earnings: 1400,
                teamSize: 3,
                profilePhoto: 'https://ui-avatars.com/api/?name=Robert+Taylor&background=f59e0b&color=fff'
              }
            ]
          },
          {
            id: 'user010',
            name: 'Emma White',
            rank: 'Diamond',
            earnings: 8500,
            teamSize: 25,
            profilePhoto: 'https://ui-avatars.com/api/?name=Emma+White&background=ef4444&color=fff',
            children: [
              {
                id: 'user021',
                name: 'Alex Rodriguez',
                rank: 'Gold',
                earnings: 3200,
                teamSize: 8,
                profilePhoto: 'https://ui-avatars.com/api/?name=Alex+Rodriguez&background=1e3a8a&color=fff'
              },
              {
                id: 'user022',
                name: 'Maria Garcia',
                rank: 'Silver',
                earnings: 1900,
                teamSize: 5,
                profilePhoto: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=10b981&color=fff'
              }
            ]
          }
        ]
      }
    ]
  };

  const toggleNodeExpansion = (nodeId) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const getRankColor = (rank) => {
    switch (rank?.toLowerCase()) {
      case 'bronze': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'silver': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'diamond': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-neutral-100 text-neutral-800 border-neutral-200';
    }
  };

  const TreeNode = ({ node, level = 0, position = 'center' }) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    
    return (
      <div className="flex flex-col items-center relative">
        {/* Connection lines */}
        {level > 0 && (
          <>
            {/* Vertical line from parent */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-px h-8 bg-neutral-300" />
            {/* Horizontal line */}
            {position === 'left' && (
              <div className="absolute -top-8 left-1/2 w-16 h-px bg-neutral-300" />
            )}
            {position === 'right' && (
              <div className="absolute -top-8 right-1/2 w-16 h-px bg-neutral-300" />
            )}
          </>
        )}

        {/* Node card */}
        <div className="relative group">
          <div className="bg-white rounded-xl shadow-lg border-2 border-primary-200 hover:border-primary-400 transition-all duration-300 p-4 w-56 hover:shadow-xl transform hover:-translate-y-1">
            {/* Profile section */}
            <div className="flex items-center space-x-3 mb-3">
              <img
                src={node.profilePhoto}
                alt={node.name}
                className="h-12 w-12 rounded-full border-2 border-white shadow-md"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-neutral-900 truncate">{node.name}</h4>
                <p className="text-xs text-neutral-500">ID: {node.id}</p>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRankColor(node.rank)}`}>
                  <Award className="h-3 w-3 mr-1" />
                  {node.rank}
                </div>
              </div>
            </div>
            
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-success/10 rounded-lg p-2 text-center border border-success/20">
                <div className="text-success font-medium">₹{node.earnings?.toLocaleString()}</div>
                <div className="text-neutral-600">Earnings</div>
              </div>
              <div className="bg-primary-50 rounded-lg p-2 text-center border border-primary-200">
                <div className="text-primary-600 font-medium">{node.teamSize}</div>
                <div className="text-neutral-600">Team</div>
              </div>
            </div>

            {/* Expand/Collapse button */}
            {hasChildren && (
              <button
                onClick={() => toggleNodeExpansion(node.id)}
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-primary-600 hover:bg-primary-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm transition-all duration-200 shadow-lg hover:shadow-xl"
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </button>
            )}
          </div>

          {/* Tooltip on hover */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-neutral-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
            <div>Joined: {new Date().toLocaleDateString()}</div>
            <div>Direct Referrals: {Math.floor(Math.random() * 10)}</div>
            <div>Status: Active</div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-neutral-900"></div>
          </div>
        </div>

        {/* Children */}
        {isExpanded && hasChildren && (
          <div className="mt-12 flex justify-center space-x-16">
            {node.children.map((child, index) => (
              <div key={child.id} className="relative">
                {/* Connection line to parent */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-px h-12 bg-neutral-300" />
                {/* Horizontal connector */}
                {index === 0 && node.children.length > 1 && (
                  <div className="absolute -top-12 left-1/2 w-16 h-px bg-neutral-300" />
                )}
                {index === 1 && (
                  <div className="absolute -top-12 right-1/2 w-16 h-px bg-neutral-300" />
                )}
                <TreeNode 
                  node={child} 
                  level={level + 1} 
                  position={index === 0 ? 'left' : 'right'} 
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const TableView = () => {
    const flattenTree = (node, level = 0) => {
      const result = [{ ...node, level }];
      if (node.children && expandedNodes.has(node.id)) {
        node.children.forEach(child => {
          result.push(...flattenTree(child, level + 1));
        });
      }
      return result;
    };

    const flatData = enhancedTreeData ? flattenTree(enhancedTreeData) : [];

    return (
      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                  Team Size
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                  Earnings
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {flatData.map((node, index) => (
                <tr key={node.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div style={{ marginLeft: `${node.level * 24}px` }} className="flex items-center">
                        {node.children && node.children.length > 0 && (
                          <button
                            onClick={() => toggleNodeExpansion(node.id)}
                            className="mr-2 p-1 hover:bg-neutral-200 rounded transition-colors"
                          >
                            {expandedNodes.has(node.id) ? 
                              <ChevronDown className="h-4 w-4 text-neutral-600" /> : 
                              <ChevronRight className="h-4 w-4 text-neutral-600" />
                            }
                          </button>
                        )}
                        <img
                          src={node.profilePhoto}
                          alt={node.name}
                          className="h-10 w-10 rounded-full border-2 border-neutral-200"
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-neutral-900">{node.name}</div>
                        <div className="text-sm text-neutral-500">{node.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                      Level {node.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getRankColor(node.rank)}`}>
                      {node.rank}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                    {node.teamSize}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-success">
                    ₹{node.earnings?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    <button className="text-primary-600 hover:text-primary-800 font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Binary Tree Network</h1>
          <p className="text-neutral-600 mt-1">Visualize and manage your MLM network structure</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex bg-neutral-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('tree')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                viewMode === 'tree' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Tree View
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                viewMode === 'table' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Table View
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full sm:w-64 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <select
                value={filterRank}
                onChange={(e) => setFilterRank(e.target.value)}
                className="pl-10 pr-8 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white transition-all"
              >
                <option value="all">All Ranks</option>
                <option value="bronze">Bronze</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="diamond">Diamond</option>
              </select>
            </div>
          </div>
          
          {viewMode === 'tree' && (
            <div className="flex items-center space-x-2">
              <button className="p-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
                <ZoomIn className="h-4 w-4" />
              </button>
              <button className="p-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
                <ZoomOut className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setExpandedNodes(new Set())}
                className="px-3 py-2 text-sm border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Collapse All
              </button>
              <button 
                onClick={() => {
                  const allNodes = new Set();
                  const addAllNodes = (node) => {
                    allNodes.add(node.id);
                    if (node.children) {
                      node.children.forEach(addAllNodes);
                    }
                  };
                  addAllNodes(enhancedTreeData);
                  setExpandedNodes(allNodes);
                }}
                className="px-3 py-2 text-sm border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Expand All
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tree Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-soft p-6 border-l-4 border-primary-600">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary-100 rounded-lg">
              <Users className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Members</p>
              <p className="text-2xl font-bold text-neutral-900">{(user?.leftLegCount || 0) + (user?.rightLegCount || 0)}</p>
              <p className="text-xs text-success">+5 this week</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-soft p-6 border-l-4 border-success">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-success/20 rounded-lg">
              <Users className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-600">Left Leg</p>
              <p className="text-2xl font-bold text-neutral-900">{user?.leftLegCount || 3}</p>
              <p className="text-xs text-success">+2 this week</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-soft p-6 border-l-4 border-warning">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-warning/20 rounded-lg">
              <Users className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-600">Right Leg</p>
              <p className="text-2xl font-bold text-neutral-900">{user?.rightLegCount || 4}</p>
              <p className="text-xs text-success">+3 this week</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-soft p-6 border-l-4 border-secondary-600">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-secondary-100 rounded-lg">
              <Award className="h-6 w-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-600">Active Members</p>
              <p className="text-2xl font-bold text-neutral-900">{Math.floor(((user?.leftLegCount || 0) + (user?.rightLegCount || 0)) * 0.85)}</p>
              <p className="text-xs text-success">85% active rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tree Content */}
      <div className="bg-white rounded-xl shadow-soft">
        {viewMode === 'tree' ? (
          <div className="p-8">
            <div className="overflow-x-auto">
              <div className="min-w-max py-8 flex justify-center">
                {enhancedTreeData ? (
                  <TreeNode node={enhancedTreeData} />
                ) : (
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-neutral-900 mb-2">No Tree Data Available</h3>
                    <p className="text-neutral-600">Start building your network by inviting referrals</p>
                    <button className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      Invite Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <TableView />
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeView;