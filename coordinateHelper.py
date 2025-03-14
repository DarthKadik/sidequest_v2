import numpy as np
import argparse

def deg2rad(deg):
    """Convert degrees to radians."""
    return deg * np.pi / 180.0

def rotation_matrix_x(theta):
    """Rotation matrix for rotation about the x-axis."""
    return np.array([
        [1, 0, 0],
        [0, np.cos(theta), -np.sin(theta)],
        [0, np.sin(theta),  np.cos(theta)]
    ])

def rotation_matrix_y(theta):
    """Rotation matrix for rotation about the y-axis."""
    return np.array([
        [ np.cos(theta), 0, np.sin(theta)],
        [0, 1, 0],
        [-np.sin(theta), 0, np.cos(theta)]
    ])

def rotation_matrix_z(theta):
    """Rotation matrix for rotation about the z-axis."""
    return np.array([
        [np.cos(theta), -np.sin(theta), 0],
        [np.sin(theta),  np.cos(theta), 0],
        [0, 0, 1]
    ])

if __name__ == "__main__":
    # Set up argument parsing for x and y coordinates.
    parser = argparse.ArgumentParser(description="Rotate a 2D map point to 3D using fixed rotation angles.")
    parser.add_argument("x", type=float, help="The x coordinate of the point.")
    parser.add_argument("y", type=float, help="The y coordinate of the point.")
    parser.add_argument("z", type=float, default=0, help="The z coordinate of the point (default: 0).")
    args = parser.parse_args()

    # Create the initial 2D point (z = 0 since the map is flat).
    point = np.array([args.x, args.y, args.z])
    
    # Fixed rotation angles (in degrees)
    theta_x_deg = -65.80  # Rotation about the x-axis
    theta_y_deg = -9.20  # Rotation about the y-axis
    theta_z_deg = -78.00  # Rotation about the z-axis
    
    # Convert degrees to radians
    theta_x = deg2rad(theta_x_deg)
    theta_y = deg2rad(theta_y_deg)
    theta_z = deg2rad(theta_z_deg)
    
    # Create individual rotation matrices
    Rx = rotation_matrix_x(theta_x)
    Ry = rotation_matrix_y(theta_y)
    Rz = rotation_matrix_z(theta_z)
    
    # Compose the rotations: order is x-axis, then y-axis, then z-axis
    composite_rotation = Rz @ Ry @ Rx
    
    # Apply the composite rotation to the point
    rotated_point = composite_rotation.dot(point)
    
    print("Original point: ({}, {}, {})".format(point[0], point[1], point[2]))
    print("Rotated point: ({:.4f}, {:.4f}, {:.4f})".format(rotated_point[0], rotated_point[1], rotated_point[2]))
