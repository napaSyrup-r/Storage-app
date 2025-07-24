import React, { useState } from 'react';
import { 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Collapse,
  IconButton,
  TextField
} from '@mui/material';
import { 
  Folder as FolderIcon, 
  FolderOpen as FolderOpenIcon,
  InsertDriveFile as FileIcon,
  CreateNewFolder as CreateFolderIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const FolderTree = ({ folders, onFileSelect }) => {
  const [expanded, setExpanded] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const handleToggle = (folderId) => {
    setExpanded(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const handleEdit = (folder) => {
    setEditingId(folder._id);
    setEditName(folder.name);
  };

  const handleSaveEdit = () => {
    // Call API to save changes
    console.log('Saving:', editingId, editName);
    setEditingId(null);
  };

  const renderFolder = (folder) => (
    <div key={folder._id}>
      <ListItem>
        <ListItemIcon onClick={() => handleToggle(folder._id)}>
          {expanded[folder._id] ? <FolderOpenIcon /> : <FolderIcon />}
        </ListItemIcon>
        
        {editingId === folder._id ? (
          <TextField
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleSaveEdit}
            autoFocus
          />
        ) : (
          <ListItemText 
            primary={folder.name} 
            onClick={() => handleToggle(folder._id)} 
          />
        )}
        
        <IconButton onClick={() => handleEdit(folder)}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={() => console.log('Delete', folder._id)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={() => console.log('Add subfolder to', folder._id)}>
          <CreateFolderIcon fontSize="small" />
        </IconButton>
      </ListItem>
      
      <Collapse in={expanded[folder._id]}>
        <List sx={{ pl: 4 }}>
          {folder.children?.map(renderFolder)}
          {folder.files?.map(file => (
            <ListItem key={file._id} onClick={() => onFileSelect(file)}>
              <ListItemIcon>
                <FileIcon />
              </ListItemIcon>
              <ListItemText primary={file.name} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </div>
  );

  return (
    <List>
      {folders.map(renderFolder)}
    </List>
  );
};

export default FolderTree;