import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import Task from '@/models/Task';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const userId = await getAuthUser(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { status, priority, description, dueDate } = await req.json();
    
    const task = await Task.findOneAndUpdate(
      {
        _id: params.id,
        $or: [{ assignedTo: userId }, { createdBy: userId }]
      },
      {
        status,
        priority,
        description,
        dueDate,
      },
      { new: true }
    ).populate('assignedTo', 'name email')
     .populate('createdBy', 'name email');
    
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    
    // Emit socket event for real-time updates
    const io = (global as any).io;
    if (io) {
      io.to(`task-${params.id}`).emit('taskUpdated', task);
    }
    
    return NextResponse.json(task);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const userId = await getAuthUser(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const task = await Task.findOneAndDelete({
      _id: params.id,
      createdBy: userId
    });
    
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    
    // Emit socket event for real-time updates
    const io = (global as any).io;
    if (io) {
      io.to(`task-${params.id}`).emit('taskDeleted', params.id);
    }
    
    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}