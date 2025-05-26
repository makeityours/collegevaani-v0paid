"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Database,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  HardDrive,
  Zap,
  Lock,
  RefreshCw,
  BarChart3,
  FileText,
  Download,
} from "lucide-react"

export function DatabaseOptimizationDashboard() {
  const [systemHealth, setSystemHealth] = useState({
    overall: 92,
    performance: 88,
    security: 95,
    backup: 100,
    storage: 78,
  })

  const [metrics, setMetrics] = useState({
    totalRecords: 2450000,
    dailyGrowth: 1250,
    queryPerformance: 45, // ms average
    uptime: 99.9,
    storageUsed: 78,
    backupStatus: "Completed",
    lastBackup: "2 hours ago",
  })

  const [securityStatus] = useState({
    encryption: "AES-256",
    accessControl: "RBAC Enabled",
    auditLogs: "Active",
    compliance: ["GDPR", "CCPA", "SOC2"],
    vulnerabilities: 0,
    lastScan: "Yesterday",
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Database Management</h2>
          <p className="text-muted-foreground">Monitor and optimize your data infrastructure</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Overall Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{systemHealth.overall}%</div>
            <Progress value={systemHealth.overall} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.performance}%</div>
            <Progress value={systemHealth.performance} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Security</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{systemHealth.security}%</div>
            <Progress value={systemHealth.security} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Backup</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{systemHealth.backup}%</div>
            <Progress value={systemHealth.backup} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Storage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{systemHealth.storage}%</div>
            <Progress value={systemHealth.storage} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="backup">Backup & Recovery</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Query Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Average Query Time</span>
                    <Badge variant="outline">{metrics.queryPerformance}ms</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Slow Queries (>1s)</span>
                    <Badge variant="destructive">3</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Cache Hit Rate</span>
                    <Badge variant="default">94.2%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Connection Pool</span>
                    <Badge variant="outline">45/100</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="h-5 w-5" />
                  Storage Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Records</span>
                    <Badge variant="outline">{metrics.totalRecords.toLocaleString()}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Daily Growth</span>
                    <Badge variant="default">+{metrics.dailyGrowth}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Storage Used</span>
                    <Badge variant="outline">{metrics.storageUsed}%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Index Efficiency</span>
                    <Badge variant="default">91%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center bg-muted/30 rounded-md">
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Performance chart visualization</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Encryption</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <Badge variant="default">{securityStatus.encryption}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Access Control</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <Badge variant="default">{securityStatus.accessControl}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Audit Logs</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <Badge variant="default">{securityStatus.auditLogs}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Vulnerabilities</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <Badge variant="default">{securityStatus.vulnerabilities}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Compliance Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityStatus.compliance.map((standard, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span>{standard}</span>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <Badge variant="default">Compliant</Badge>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between">
                    <span>Last Security Scan</span>
                    <Badge variant="outline">{securityStatus.lastScan}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              All security protocols are active. Next security audit scheduled for next week.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Backup Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Last Backup</span>
                    <Badge variant="default">{metrics.lastBackup}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Backup Status</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <Badge variant="default">{metrics.backupStatus}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Backup Size</span>
                    <Badge variant="outline">2.4 GB</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Retention Period</span>
                    <Badge variant="outline">30 days</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  Recovery Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start">
                    <Clock className="mr-2 h-4 w-4" />
                    Point-in-Time Recovery
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Database className="mr-2 h-4 w-4" />
                    Full Database Restore
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Selective Table Restore
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Download Backup
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Backup Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Full Backup</h4>
                    <p className="text-sm text-muted-foreground">Complete database backup</p>
                  </div>
                  <Badge variant="outline">Daily at 2:00 AM</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Incremental Backup</h4>
                    <p className="text-sm text-muted-foreground">Changes since last backup</p>
                  </div>
                  <Badge variant="outline">Every 6 hours</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Transaction Log Backup</h4>
                    <p className="text-sm text-muted-foreground">Real-time transaction logs</p>
                  </div>
                  <Badge variant="outline">Every 15 minutes</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Data Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">+15.2%</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Query Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">1.2M</div>
                <p className="text-xs text-muted-foreground">Queries/day</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">12,543</div>
                <p className="text-xs text-muted-foreground">Concurrent</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Data Usage Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-md">
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Analytics dashboard visualization</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Optimization Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium">Index Optimization</h4>
                    <p className="text-sm text-muted-foreground">
                      3 tables could benefit from additional indexes to improve query performance
                    </p>
                    <Button size="sm" className="mt-2">
                      Apply Optimization
                    </Button>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium">Storage Cleanup</h4>
                    <p className="text-sm text-muted-foreground">
                      Remove old log files and temporary data to free up 2.1 GB of storage
                    </p>
                    <Button size="sm" className="mt-2">
                      Clean Storage
                    </Button>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium">Query Cache</h4>
                    <p className="text-sm text-muted-foreground">
                      Query cache is optimally configured with 94.2% hit rate
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Automated Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Index Rebuild</h4>
                    <p className="text-sm text-muted-foreground">Rebuild fragmented indexes</p>
                  </div>
                  <Badge variant="default">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Statistics Update</h4>
                    <p className="text-sm text-muted-foreground">Update query optimizer statistics</p>
                  </div>
                  <Badge variant="default">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Log Cleanup</h4>
                    <p className="text-sm text-muted-foreground">Remove old transaction logs</p>
                  </div>
                  <Badge variant="default">Enabled</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
