"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Save, Eye, X, Plus } from "lucide-react"
import { OptimizedImage } from "@/components/ui/optimized-image"

interface ContentEditorProps {
  type: "college" | "course" | "news"
  initialData?: any
  onSave: (data: any) => Promise<void>
  onCancel: () => void
}

export function ContentEditor({ type, initialData, onSave, onCancel }: ContentEditorProps) {
  const [data, setData] = useState(
    initialData || {
      name: "",
      slug: "",
      description: "",
      content: "",
      isActive: true,
      isFeatured: false,
      images: [],
      tags: [],
      metadata: {},
    },
  )
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(false)
  const [newTag, setNewTag] = useState("")

  const handleSave = async () => {
    setLoading(true)
    try {
      await onSave(data)
    } catch (error) {
      console.error("Save error:", error)
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const addTag = () => {
    if (newTag && !data.tags.includes(newTag)) {
      setData((prev) => ({ ...prev, tags: [...prev.tags, newTag] }))
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    setData((prev) => ({ ...prev, tags: prev.tags.filter((t: string) => t !== tag) }))
  }

  const handleImageUpload = async (file: File) => {
    // Implement image upload logic here
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      const result = await response.json()
      if (result.success) {
        setData((prev) => ({ ...prev, images: [...prev.images, result.url] }))
      }
    } catch (error) {
      console.error("Upload error:", error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {initialData ? "Edit" : "Create"} {type.charAt(0).toUpperCase() + type.slice(1)}
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setPreview(!preview)}>
            <Eye className="w-4 h-4 mr-2" />
            {preview ? "Edit" : "Preview"}
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      {preview ? (
        <ContentPreview data={data} type={type} />
      ) : (
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList>
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={data.name}
                      onChange={(e) => {
                        const name = e.target.value
                        setData((prev) => ({
                          ...prev,
                          name,
                          slug: prev.slug || generateSlug(name),
                        }))
                      }}
                      placeholder={`Enter ${type} name`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug *</Label>
                    <Input
                      id="slug"
                      value={data.slug}
                      onChange={(e) => setData((prev) => ({ ...prev, slug: generateSlug(e.target.value) }))}
                      placeholder="url-friendly-name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description..."
                    rows={3}
                  />
                </div>

                {type === "college" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={data.location || ""}
                        onChange={(e) => setData((prev) => ({ ...prev, location: e.target.value }))}
                        placeholder="City, State"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">College Type</Label>
                      <Select
                        value={data.collegeType || ""}
                        onValueChange={(value) => setData((prev) => ({ ...prev, collegeType: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="government">Government</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                          <SelectItem value="deemed">Deemed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="established">Established Year</Label>
                      <Input
                        id="established"
                        type="number"
                        value={data.establishedYear || ""}
                        onChange={(e) =>
                          setData((prev) => ({ ...prev, establishedYear: Number.parseInt(e.target.value) }))
                        }
                        placeholder="YYYY"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="content">Detailed Content</Label>
                  <Textarea
                    id="content"
                    value={data.content}
                    onChange={(e) => setData((prev) => ({ ...prev, content: e.target.value }))}
                    placeholder="Write detailed content here..."
                    rows={15}
                    className="font-mono"
                  />
                  <p className="text-sm text-muted-foreground">Supports Markdown formatting</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Media & Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Drag and drop images or click to upload</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || [])
                      files.forEach(handleImageUpload)
                    }}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button variant="outline" onClick={() => document.getElementById("image-upload")?.click()}>
                    Choose Files
                  </Button>
                </div>

                {data.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {data.images.map((image: string, index: number) => (
                      <div key={index} className="relative group">
                        <OptimizedImage
                          src={image}
                          alt={`Image ${index + 1}`}
                          width={200}
                          height={150}
                          className="rounded-lg object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() =>
                            setData((prev) => ({
                              ...prev,
                              images: prev.images.filter((_: any, i: number) => i !== index),
                            }))
                          }
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    value={data.metadata?.title || ""}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        metadata: { ...prev.metadata, title: e.target.value },
                      }))
                    }
                    placeholder="SEO title (60 characters max)"
                    maxLength={60}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    value={data.metadata?.description || ""}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        metadata: { ...prev.metadata, description: e.target.value },
                      }))
                    }
                    placeholder="SEO description (160 characters max)"
                    maxLength={160}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add tag"
                      onKeyDown={(e) => e.key === "Enter" && addTag()}
                    />
                    <Button onClick={addTag}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {data.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="hover:bg-muted-foreground/20 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Publication Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="isActive">Active</Label>
                    <p className="text-sm text-muted-foreground">Make this content visible to users</p>
                  </div>
                  <Switch
                    id="isActive"
                    checked={data.isActive}
                    onCheckedChange={(checked) => setData((prev) => ({ ...prev, isActive: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="isFeatured">Featured</Label>
                    <p className="text-sm text-muted-foreground">Show in featured sections</p>
                  </div>
                  <Switch
                    id="isFeatured"
                    checked={data.isFeatured}
                    onCheckedChange={(checked) => setData((prev) => ({ ...prev, isFeatured: checked }))}
                  />
                </div>

                {type === "news" && (
                  <div className="space-y-2">
                    <Label htmlFor="publishDate">Publish Date</Label>
                    <Input
                      id="publishDate"
                      type="datetime-local"
                      value={data.publishedAt || ""}
                      onChange={(e) => setData((prev) => ({ ...prev, publishedAt: e.target.value }))}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

function ContentPreview({ data, type }: { data: any; type: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none">
          <h1>{data.name}</h1>
          {data.description && <p className="lead">{data.description}</p>}
          {data.images.length > 0 && (
            <OptimizedImage src={data.images[0]} alt={data.name} width={600} height={300} className="rounded-lg" />
          )}
          <div className="whitespace-pre-wrap">{data.content}</div>
          {data.tags.length > 0 && (
            <div className="flex gap-2 mt-4">
              {data.tags.map((tag: string) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
