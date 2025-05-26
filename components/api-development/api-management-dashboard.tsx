"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Code,
  Key,
  Activity,
  Shield,
  Clock,
  AlertTriangle,
  BarChart3,
  FileText,
  Settings,
  Globe,
  Eye,
  Copy,
  Download,
} from "lucide-react"

export function APIManagementDashboard() {
  const [apiEndpoints] = useState([
    {
      id: "1",
      name: "User Authentication",
      endpoint: "/api/auth",
      method: "POST",
      version: "v1",
      status: "active",
      requests: 15420,
      avgResponse: 120,
      errorRate: 0.2,
      lastUsed: "2 minutes ago",
    },
    {
      id: "2",
      name: "College Search",
      endpoint: "/api/colleges/search",
      method: "GET",
      version: "v1",
      status: "active",
      requests: 8930,
      avgResponse: 85,
      errorRate: 0.1,
      lastUsed: "5 minutes ago",
    },
    {
      id: "3",
      name: "Lead Management",
      endpoint: "/api/leads",
      method: "POST",
      version: "v2",
      status: "active",
      requests: 5670,
      avgResponse: 95,
      errorRate: 0.3,
      lastUsed: "1 minute ago",
    },
    {
      id: "4",
      name: "Payment Processing",
      endpoint: "/api/payments",
      method: "POST",
      version: "v1",
      status: "deprecated",
      requests: 1200,
      avgResponse: 200,
      errorRate: 1.2,
      lastUsed: "1 hour ago",
    },
  ])

  const [apiKeys] = useState([
    {
      id: "1",
      name: "Mobile App Key",
      key: "ak_live_1234567890abcdef",
      permissions: ["read", "write"],
      rateLimit: "1000/hour",
      lastUsed: "2 minutes ago",
      status: "active",
    },
    {
      id: "2",
      name: "Partner Integration",
      key: "ak_live_abcdef1234567890",
      permissions: ["read"],
      rateLimit: "500/hour",
      lastUsed: "1 hour ago",
      status: "active",
    },
    {
      id: "3",
      name: "Analytics Service",
      key: "ak_test_9876543210fedcba",
      permissions: ["read"],
      rateLimit: "100/hour",
      lastUsed: "Never",
      status: "inactive",
    },
  ])

  const [metrics] = useState({
    totalRequests: 125430,
    successRate: 99.2,
    avgResponseTime: 95,
    activeEndpoints: 15,
    rateLimitHits: 23,
    errors: 156,
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">API Management</h2>
          <p className="text-muted-foreground">Monitor and manage your API infrastructure</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Documentation
          </Button>
          <Button>
            <Key className="mr-2 h-4 w-4" />
            Generate API Key
          </Button>
        </div>
      </div>

      {/* API Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalRequests.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{metrics.successRate}%</div>
            <p className="text-xs text-muted-foreground">HTTP 2xx responses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Avg Response</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.avgResponseTime}ms</div>
            <p className="text-xs text-muted-foreground">Response time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Active Endpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeEndpoints}</div>
            <p className="text-xs text-muted-foreground">Available APIs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Rate Limit Hits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{metrics.rateLimitHits}</div>
            <p className="text-xs text-muted-foreground">Last hour</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{metrics.errors}</div>
            <p className="text-xs text-muted-foreground">4xx/5xx responses</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="endpoints" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="documentation">Docs</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="endpoints" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                API Endpoints
              </CardTitle>
              <CardDescription>Manage and monitor your API endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiEndpoints.map((endpoint) => (
                  <div key={endpoint.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            endpoint.method === "GET"
                              ? "default"
                              : endpoint.method === "POST"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm bg-muted px-2 py-1 rounded">{endpoint.endpoint}</code>
                        <Badge variant="outline">v{endpoint.version}</Badge>
                      </div>
                      <Badge variant={endpoint.status === "active" ? "default" : "secondary"}>{endpoint.status}</Badge>
                    </div>

                    <div>
                      <h4 className="font-medium">{endpoint.name}</h4>
                      <p className="text-sm text-muted-foreground">Last used: {endpoint.lastUsed}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Requests</span>
                        <div className="font-medium">{endpoint.requests.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Avg Response</span>
                        <div className="font-medium">{endpoint.avgResponse}ms</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Error Rate</span>
                        <div className={`font-medium ${endpoint.errorRate > 1 ? "text-red-600" : "text-green-600"}`}>
                          {endpoint.errorRate}%
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        View Logs
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="mr-2 h-4 w-4" />
                        Configure
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        Documentation
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keys" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Keys Management
              </CardTitle>
              <CardDescription>Create and manage API keys for different applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full">
                  <Key className="mr-2 h-4 w-4" />
                  Generate New API Key
                </Button>

                {apiKeys.map((key) => (
                  <div key={key.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{key.name}</h4>
                      <Badge variant={key.status === "active" ? "default" : "secondary"}>{key.status}</Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-muted px-2 py-1 rounded flex-1 font-mono">{key.key}</code>
                      <Button size="sm" variant="outline">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Permissions</span>
                        <div className="flex gap-1 mt-1">
                          {key.permissions.map((perm, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {perm}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Rate Limit</span>
                        <div className="font-medium">{key.rateLimit}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Used</span>
                        <div className="font-medium">{key.lastUsed}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Settings className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Activity className="mr-2 h-4 w-4" />
                        Usage Stats
                      </Button>
                      <Button size="sm" variant="destructive">
                        Revoke
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Request Volume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-muted/30 rounded-md">
                  <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Request volume chart</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Response Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-muted/30 rounded-md">
                  <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Response time chart</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Real-time Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">99.2%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl font-bold">1,234</div>
                    <div className="text-sm text-muted-foreground">Requests/min</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl font-bold">95ms</div>
                    <div className="text-sm text-muted-foreground">Avg Response</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl font-bold text-red-600">3</div>
                    <div className="text-sm text-muted-foreground">Active Alerts</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Active Alerts</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 border rounded-lg bg-red-50">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <div className="flex-1">
                        <p className="font-medium">High Error Rate</p>
                        <p className="text-sm text-muted-foreground">/api/payments endpoint showing 5% error rate</p>
                      </div>
                      <Badge variant="destructive">Critical</Badge>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg bg-yellow-50">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <div className="flex-1">
                        <p className="font-medium">Rate Limit Approaching</p>
                        <p className="text-sm text-muted-foreground">API key ak_live_1234... at 90% of rate limit</p>
                      </div>
                      <Badge variant="secondary">Warning</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">HTTPS Only</h4>
                      <p className="text-sm text-muted-foreground">Force all API requests to use HTTPS</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">API Key Authentication</h4>
                      <p className="text-sm text-muted-foreground">Require API key for all requests</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Rate Limiting</h4>
                      <p className="text-sm text-muted-foreground">Enable rate limiting per API key</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Request Logging</h4>
                      <p className="text-sm text-muted-foreground">Log all API requests for audit</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">CORS Configuration</h4>
                  <div className="space-y-2">
                    <Label htmlFor="allowed-origins">Allowed Origins</Label>
                    <Textarea
                      id="allowed-origins"
                      placeholder="https://yourdomain.com&#10;https://app.yourdomain.com"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">IP Whitelist</h4>
                  <div className="space-y-2">
                    <Label htmlFor="ip-whitelist">Allowed IP Addresses</Label>
                    <Textarea id="ip-whitelist" placeholder="192.168.1.1&#10;10.0.0.0/8" className="min-h-[100px]" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                API Documentation
              </CardTitle>
              <CardDescription>Interactive API documentation and testing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button>
                    <Globe className="mr-2 h-4 w-4" />
                    View Public Docs
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download OpenAPI Spec
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Quick Start Guide</h4>
                  <div className="space-y-2 text-sm">
                    <p>1. Generate an API key from the API Keys tab</p>
                    <p>
                      2. Include the key in your request headers:{" "}
                      <code className="bg-muted px-1 rounded">Authorization: Bearer YOUR_API_KEY</code>
                    </p>
                    <p>
                      3. Make requests to our endpoints:{" "}
                      <code className="bg-muted px-1 rounded">https://api.collegevaani.com/v1/</code>
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Available Endpoints</h4>
                  {apiEndpoints
                    .filter((e) => e.status === "active")
                    .map((endpoint) => (
                      <div key={endpoint.id} className="border rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={endpoint.method === "GET" ? "default" : "destructive"}>
                            {endpoint.method}
                          </Badge>
                          <code className="text-sm">{endpoint.endpoint}</code>
                        </div>
                        <p className="text-sm text-muted-foreground">{endpoint.name}</p>
                        <Button size="sm" variant="outline" className="mt-2">
                          View Documentation
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                API Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">General Settings</h4>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="api-version">Default API Version</Label>
                      <Select defaultValue="v1">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="v1">Version 1.0</SelectItem>
                          <SelectItem value="v2">Version 2.0 (Beta)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rate-limit">Default Rate Limit</Label>
                      <Select defaultValue="1000">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="100">100 requests/hour</SelectItem>
                          <SelectItem value="500">500 requests/hour</SelectItem>
                          <SelectItem value="1000">1000 requests/hour</SelectItem>
                          <SelectItem value="5000">5000 requests/hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Webhook Settings</h4>
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <Input id="webhook-url" placeholder="https://your-app.com/webhooks/api" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Enable Webhooks</h5>
                      <p className="text-sm text-muted-foreground">Send events to your webhook URL</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Monitoring & Alerts</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Error Rate Alerts</h5>
                        <p className="text-sm text-muted-foreground">Alert when error rate exceeds threshold</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Rate Limit Alerts</h5>
                        <p className="text-sm text-muted-foreground">Alert when approaching rate limits</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
