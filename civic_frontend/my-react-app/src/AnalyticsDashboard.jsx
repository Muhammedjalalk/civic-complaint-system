// src/components/AnalyticsDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnalyticsDashboard = ({ userRole }) => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('month');

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const response = await axios.get(
        `/accounts/analytics/complaints/?period=${period}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setAnalytics(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch analytics');
      console.error('Analytics fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    return num ? num.toLocaleString() : 0;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'ASSIGNED': return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS': return 'bg-indigo-100 text-indigo-800';
      case 'RESOLVED': return 'bg-green-100 text-green-800';
      case 'VERIFIED': return 'bg-emerald-100 text-emerald-800';
      case 'ESCALATED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="border border-red-300 bg-red-50 rounded-lg p-6">
          <div className="text-center">
            <div className="text-red-500 text-2xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-red-800">Error Loading Analytics</h3>
            <p className="mt-2 text-red-600">{error}</p>
            <button
              onClick={fetchAnalytics}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Insights for {userRole.toLowerCase()}
        </p>
        
        <div className="flex flex-wrap gap-4 mt-4">
          <select 
            value={period} 
            onChange={(e) => setPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="day">Last Day</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
          
          <button
            onClick={fetchAnalytics}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Refresh Data
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      {analytics?.summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Complaints */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">Total Complaints</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {formatNumber(analytics.summary.total_complaints)}
                </h3>
              </div>
              <div className="text-blue-500">📊</div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Period: {period}
            </div>
          </div>

          {/* Role-specific cards */}
          {userRole === 'CITIZEN' && (
            <>
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-600">Resolved</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">
                      {formatNumber(analytics.summary.resolved)}
                    </h3>
                    {analytics.summary.avg_resolution_days && (
                      <p className="text-xs text-gray-600 mt-1">
                        Avg: {analytics.summary.avg_resolution_days} days
                      </p>
                    )}
                  </div>
                  <div className="text-green-500">✅</div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-600">In Progress</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">
                      {formatNumber(analytics.summary.in_progress)}
                    </h3>
                  </div>
                  <div className="text-yellow-500">⏳</div>
                </div>
              </div>
            </>
          )}

          {userRole === 'OFFICER' && (
            <>
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-600">Resolution Rate</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">
                      {analytics.summary.resolved && analytics.summary.total_complaints 
                        ? `${Math.round((analytics.summary.resolved / analytics.summary.total_complaints) * 100)}%`
                        : '0%'
                      }
                    </h3>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ 
                          width: `${analytics.summary.resolved && analytics.summary.total_complaints 
                            ? (analytics.summary.resolved / analytics.summary.total_complaints) * 100 
                            : 0
                          }%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-green-500">📈</div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-600">Escalated</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">
                      {formatNumber(analytics.summary.escalated)}
                    </h3>
                    {analytics.summary.escalated > 0 && (
                      <p className="text-xs text-red-600 mt-1">
                        Needs attention
                      </p>
                    )}
                  </div>
                  <div className="text-red-500">⚠️</div>
                </div>
              </div>
            </>
          )}

          {userRole === 'ADMIN' && (
            <>
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-600">Active Users</p>
                    <div className="space-y-1 mt-1">
                      <div className="flex justify-between text-sm">
                        <span>Citizens:</span>
                        <span className="font-semibold">{formatNumber(analytics.summary.total_citizens)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Officers:</span>
                        <span className="font-semibold">{formatNumber(analytics.summary.total_officers)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Staff:</span>
                        <span className="font-semibold">{formatNumber(analytics.summary.total_staff)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-indigo-500">👥</div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-600">System Resolution</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">
                      {analytics.summary.resolution_rate || 0}%
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                      Overall success rate
                    </p>
                  </div>
                  <div className="text-emerald-500">🎯</div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Status Distribution */}
      {analytics?.by_status?.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analytics.by_status.map((item) => (
              <div key={item.status} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                  <span className="text-lg font-bold">{formatNumber(item.count)}</span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  {analytics.summary.total_complaints 
                    ? `${Math.round((item.count / analytics.summary.total_complaints) * 100)}% of total`
                    : '0%'
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Staff Performance (for Officers) */}
      {userRole === 'OFFICER' && analytics?.staff_performance?.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Staff Performance</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Staff Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assignments</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Completion Rate</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {analytics.staff_performance.map((staff, index) => (
                  <tr key={staff.staff_id}>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                        index < 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{staff.staff_name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{staff.total_assignments}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span className="text-sm font-semibold text-green-600 mr-2">
                          {staff.completion_rate}%
                        </span>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${staff.completion_rate}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {staff.avg_completion_time ? `${staff.avg_completion_time} hours` : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Department Performance (for Admin) */}
      {userRole === 'ADMIN' && analytics?.by_department?.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
          <div className="space-y-4">
            {analytics.by_department.map((dept) => (
              <div key={dept.department_id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-900">{dept.department_name}</h4>
                  <span className="text-sm font-semibold">
                    {dept.resolution_rate}% resolved
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Total: {dept.total_complaints} complaints</span>
                  <span>Resolved: {dept.resolved}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      dept.resolution_rate >= 70 ? 'bg-green-500' :
                      dept.resolution_rate >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${dept.resolution_rate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Insights */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
        <div className="space-y-3">
          {analytics?.summary?.escalated > 0 && userRole === 'OFFICER' && (
            <div className="flex items-start">
              <span className="text-red-500 mr-2">⚠️</span>
              <p className="text-gray-700">
                <strong>{analytics.summary.escalated} complaints</strong> need escalation review
              </p>
            </div>
          )}
          
          {analytics?.summary?.resolved > 0 && userRole === 'CITIZEN' && (
            <div className="flex items-start">
              <span className="text-green-500 mr-2">✅</span>
              <p className="text-gray-700">
                <strong>{analytics.summary.resolved} of your complaints</strong> have been resolved
              </p>
            </div>
          )}
          
          {analytics?.summary?.pending > 0 && (
            <div className="flex items-start">
              <span className="text-yellow-500 mr-2">⏳</span>
              <p className="text-gray-700">
                <strong>{analytics.summary.pending} complaints</strong> are pending action
              </p>
            </div>
          )}
          
          {analytics?.by_status?.find(s => s.status === 'IN_PROGRESS') && (
            <div className="flex items-start">
              <span className="text-blue-500 mr-2">🚀</span>
              <p className="text-gray-700">
                <strong>{analytics.by_status.find(s => s.status === 'IN_PROGRESS').count} complaints</strong> are currently in progress
              </p>
            </div>
          )}
          
          {analytics?.summary?.total_complaints > 0 && (
            <div className="flex items-start">
              <span className="text-gray-500 mr-2">📊</span>
              <p className="text-gray-700">
                Total of <strong>{analytics.summary.total_complaints} complaints</strong> in the last {period}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center border border-gray-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-gray-900">
            {analytics?.summary?.total_complaints || 0}
          </div>
          <div className="text-sm text-gray-600 mt-1">Total</div>
        </div>
        
        <div className="text-center border border-gray-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">
            {analytics?.summary?.resolved || 0}
          </div>
          <div className="text-sm text-gray-600 mt-1">Resolved</div>
        </div>
        
        <div className="text-center border border-gray-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {analytics?.summary?.in_progress || 0}
          </div>
          <div className="text-sm text-gray-600 mt-1">In Progress</div>
        </div>
        
        <div className="text-center border border-gray-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-600">
            {analytics?.summary?.escalated || 0}
          </div>
          <div className="text-sm text-gray-600 mt-1">Escalated</div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;