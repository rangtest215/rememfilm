import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, doc, deleteDoc, setDoc } from 'firebase/firestore';

const AdminVideos = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // Form State
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        description: '',
        youtubeId: ''
    });

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'videos'));
            const videosData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setVideos(videosData);
        } catch (error) {
            console.error("Error fetching videos: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this video?")) return;
        try {
            await deleteDoc(doc(db, "videos", id));
            setVideos(videos.filter(video => video.id !== id));
        } catch (error) {
            console.error("Error deleting video: ", error);
            alert("Failed to delete video.");
        }
    };

    const handleEdit = (video) => {
        setEditingId(video.id);
        setFormData({
            id: video.id,
            title: video.title,
            description: video.description,
            youtubeId: video.youtubeId
        });
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setEditingId(null);
        setFormData({
            id: '',
            title: '',
            description: '',
            youtubeId: ''
        });
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const videoId = editingId || formData.id || 'v' + Date.now();

        const payload = {
            id: videoId,
            title: formData.title,
            description: formData.description,
            youtubeId: formData.youtubeId
        };

        try {
            await setDoc(doc(db, "videos", videoId), payload);
            setIsEditing(false);
            fetchVideos();
        } catch (error) {
            console.error("Error saving video: ", error);
            alert("Failed to save video.");
        }
    };

    if (loading) return <div>Loading...</div>;

    if (isEditing) {
        return (
            <div>
                <h2>{editingId ? 'Edit Video' : 'Add New Video'}</h2>
                <form onSubmit={handleSubmit} style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label>ID (Optional, auto-generated if empty)</label>
                        <input
                            value={formData.id}
                            onChange={e => setFormData({ ...formData, id: e.target.value })}
                            disabled={!!editingId}
                            placeholder="e.g., promo-2024"
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div>
                        <label>Title</label>
                        <input
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            required
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div>
                        <label>YouTube ID (e.g., dQw4w9WgXcQ)</label>
                        <input
                            value={formData.youtubeId}
                            onChange={e => setFormData({ ...formData, youtubeId: e.target.value })}
                            required
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="submit" style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
                            Save Video
                        </button>
                        <button type="button" onClick={() => setIsEditing(false)} style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', cursor: 'pointer' }}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.5rem' }}>Videos Manager</h2>
                <button onClick={handleAddNew} style={{ padding: '10px 15px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    + Add New Video
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {videos.map((video) => (
                    <div key={video.id} style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <div style={{ marginBottom: '10px', aspectRatio: '16/9', backgroundColor: '#000' }}>
                            <img
                                src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                                alt={video.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{video.title}</h3>
                        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '15px', height: '40px', overflow: 'hidden' }}>{video.description}</p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => handleEdit(video)} style={{ flex: 1, padding: '8px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                            <button onClick={() => handleDelete(video.id)} style={{ flex: 1, padding: '8px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminVideos;
