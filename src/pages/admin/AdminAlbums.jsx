import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, doc, deleteDoc, setDoc } from 'firebase/firestore';

const AdminAlbums = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // Form State
    const [editingId, setEditingId] = useState(null); // If null, we are creating
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        description: '',
        cover: '',
        photos: '' // Will allow newline-separated URLs
    });

    useEffect(() => {
        fetchAlbums();
    }, []);

    const fetchAlbums = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'albums'));
            const albumsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAlbums(albumsData);
        } catch (error) {
            console.error("Error fetching albums: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this album? This cannot be undone.")) return;
        try {
            await deleteDoc(doc(db, "albums", id));
            setAlbums(albums.filter(album => album.id !== id));
        } catch (error) {
            console.error("Error deleting album: ", error);
            alert("Failed to delete album.");
        }
    };

    const handleEdit = (album) => {
        setEditingId(album.id);
        setFormData({
            id: album.id,
            title: album.title,
            description: album.description,
            cover: album.cover,
            photos: album.photos.join('\n')
        });
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setEditingId(null);
        setFormData({
            id: '',
            title: '',
            description: '',
            cover: '',
            photos: ''
        });
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const albumId = editingId || formData.id || formData.title.toLowerCase().replace(/\s+/g, '-');

        if (!albumId) {
            alert("ID is required");
            return;
        }

        const payload = {
            id: albumId,
            title: formData.title,
            description: formData.description,
            cover: formData.cover,
            photos: formData.photos.split('\n').map(url => url.trim()).filter(url => url.length > 0)
        };

        try {
            await setDoc(doc(db, "albums", albumId), payload);
            setIsEditing(false);
            fetchAlbums(); // Refresh list
        } catch (error) {
            console.error("Error saving album: ", error);
            alert("Failed to save album.");
        }
    };

    if (loading) return <div>Loading...</div>;

    if (isEditing) {
        return (
            <div>
                <h2>{editingId ? 'Edit Album' : 'Add New Album'}</h2>
                <form onSubmit={handleSubmit} style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label>ID (Unique Slug)</label>
                        <input
                            value={formData.id}
                            onChange={e => setFormData({ ...formData, id: e.target.value })}
                            disabled={!!editingId} // Cannot change ID when editing
                            placeholder="e.g., wedding-2024"
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
                        <label>Cover Image URL</label>
                        <input
                            value={formData.cover}
                            onChange={e => setFormData({ ...formData, cover: e.target.value })}
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div>
                        <label>Photos (One URL per line)</label>
                        <textarea
                            value={formData.photos}
                            onChange={e => setFormData({ ...formData, photos: e.target.value })}
                            rows="10"
                            placeholder="https://example.com/photo1.jpg&#10;https://example.com/photo2.jpg"
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="submit" style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
                            Save Album
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
                <h2 style={{ fontSize: '1.5rem' }}>Albums Manager</h2>
                <button onClick={handleAddNew} style={{ padding: '10px 15px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    + Add New Album
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {albums.map((album) => (
                    <div key={album.id} style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <div style={{ height: '200px', backgroundColor: '#eee', marginBottom: '10px', overflow: 'hidden', borderRadius: '4px' }}>
                            {album.cover ? (
                                <img src={album.cover} alt={album.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999' }}>No Cover</div>
                            )}
                        </div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{album.title}</h3>
                        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '15px', height: '40px', overflow: 'hidden' }}>{album.description}</p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => handleEdit(album)} style={{ flex: 1, padding: '8px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                            <button onClick={() => handleDelete(album.id)} style={{ flex: 1, padding: '8px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminAlbums;
