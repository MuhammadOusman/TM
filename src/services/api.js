import { supabase } from '../lib/supabase';

export const propertiesAPI = {
  getAll: async (filters = {}) => {
    let query = supabase
      .from('properties')
      .select('*')
      .eq('status', 'available')
      .order('created_at', { ascending: false });

    if (filters.location && filters.location !== 'all') {
      query = query.eq('location', filters.location);
    }
    if (filters.type && filters.type !== 'all') {
      query = query.eq('type', filters.type);
    }
    if (filters.featured) {
      query = query.eq('featured', true);
    }

    const { data, error } = await query;
    return { data, error };
  },

  getById: async (id) => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();

    if (data && !error) {
      try {
        await supabase.rpc('increment_property_views', { property_uuid: id });
      } catch (err) {
      }
    }

    return { data, error };
  },

  create: async (propertyData) => {
    const { data, error } = await supabase
      .from('properties')
      .insert([propertyData])
      .select()
      .single();
    return { data, error };
  },

  update: async (id, propertyData) => {
    const { data, error } = await supabase
      .from('properties')
      .update({ ...propertyData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  delete: async (id) => {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);
    return { error };
  },

  getAllAdmin: async () => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  },
};

export const blogAPI = {
  getAll: async (filters = {}) => {
    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        agents (name, role, image_url)
      `)
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (filters.category && filters.category !== 'All') {
      query = query.eq('category', filters.category);
    }
    if (filters.featured) {
      query = query.eq('featured', true);
    }

    const { data, error } = await query;
    return { data, error };
  },

  getBySlug: async (slug) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        agents (name, role, image_url)
      `)
      .eq('slug', slug)
      .single();

    if (data && !error) {
      await supabase.rpc('increment_blog_views', { blog_uuid: data.id });
    }

    return { data, error };
  },

  getById: async (id) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  },

  create: async (postData) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([postData])
      .select()
      .single();
    return { data, error };
  },

  update: async (id, postData) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ ...postData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  delete: async (id) => {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);
    return { error };
  },

  getAllAdmin: async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        agents (name, role)
      `)
      .order('created_at', { ascending: false });
    return { data, error };
  },
};

export const agentsAPI = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: true });
    return { data, error };
  },

  getById: async (id) => {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  },

  create: async (agentData) => {
    const { data, error } = await supabase
      .from('agents')
      .insert([agentData])
      .select()
      .single();
    return { data, error };
  },

  update: async (id, agentData) => {
    const { data, error } = await supabase
      .from('agents')
      .update({ ...agentData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  delete: async (id) => {
    const { error } = await supabase
      .from('agents')
      .delete()
      .eq('id', id);
    return { error };
  },
};

export const inquiriesAPI = {
  create: async (inquiryData) => {
    const { data, error } = await supabase
      .from('contact_inquiries')
      .insert([inquiryData])
      .select()
      .single();
    return { data, error };
  },

  getAll: async (status = null) => {
    let query = supabase
      .from('contact_inquiries')
      .select(`
        *,
        properties (title)
      `)
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    return { data, error };
  },

  updateStatus: async (id, status, adminNotes = null) => {
    const updateData = { status, updated_at: new Date().toISOString() };
    if (adminNotes) {
      updateData.admin_notes = adminNotes;
    }

    const { data, error } = await supabase
      .from('contact_inquiries')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },
};

export const analyticsAPI = {
  trackEvent: async (eventType, entityType = null, entityId = null, metadata = {}) => {
    const { data, error } = await supabase
      .from('analytics_events')
      .insert([{
        event_type: eventType,
        entity_type: entityType,
        entity_id: entityId,
        metadata: metadata,
        user_session: localStorage.getItem('session_id') || 'anonymous',
      }])
      .select()
      .single();
    return { data, error };
  },

  getDashboardStats: async () => {
    try {
      const [properties, blogPosts, inquiries] = await Promise.all([
        supabase.from('properties').select('id', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
        supabase.from('contact_inquiries').select('id', { count: 'exact', head: true })
      ]);

      const { count: newInquiriesCount } = await supabase
        .from('contact_inquiries')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'new');

      const stats = {
        totalProperties: properties.count || 0,
        totalBlogPosts: blogPosts.count || 0,
        totalInquiries: inquiries.count || 0,
        newInquiries: newInquiriesCount || 0,
        totalViews: 0,
        inProgressInquiries: 0,
        respondedInquiries: 0
      };

      return { data: stats, error: null };
    } catch (error) {
      return {
        data: {
          totalProperties: 0,
          totalBlogPosts: 0,
          totalInquiries: 0,
          newInquiries: 0,
          totalViews: 0,
          inProgressInquiries: 0,
          respondedInquiries: 0
        },
        error
      };
    }
  },

  getChartData: async (days = 30) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from('analytics_events')
      .select('event_type, created_at')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true });

    if (error || !data) return { data: [], error };

    const chartData = {};
    data.forEach(event => {
      const date = new Date(event.created_at).toISOString().split('T')[0];
      if (!chartData[date]) {
        chartData[date] = { date, propertyViews: 0, blogViews: 0, inquiries: 0 };
      }
      if (event.event_type === 'property_view') chartData[date].propertyViews++;
      if (event.event_type === 'blog_view') chartData[date].blogViews++;
      if (event.event_type === 'inquiry') chartData[date].inquiries++;
    });

    return { data: Object.values(chartData), error: null };
  },

  getTopProperties: async (limit = 5) => {
    const { data, error } = await supabase
      .from('properties')
      .select('id, title, views_count, inquiries_count, status')
      .order('views_count', { ascending: false })
      .limit(limit);
    return { data: data || [], error };
  },

  getTopBlogPosts: async (limit = 5) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, views_count, status')
      .order('views_count', { ascending: false })
      .limit(limit);
    return { data: data || [], error };
  },
};

export const servicesAPI = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('status', 'active')
      .order('display_order', { ascending: true });
    return { data, error };
  },

  create: async (serviceData) => {
    const { data, error } = await supabase
      .from('services')
      .insert([serviceData])
      .select()
      .single();
    return { data, error };
  },

  update: async (id, serviceData) => {
    const { data, error } = await supabase
      .from('services')
      .update({ ...serviceData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  delete: async (id) => {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);
    return { error };
  },
};

export const storageAPI = {
  uploadImage: async (file, bucket = 'properties') => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (error) return { data: null, error };

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return { data: { path: filePath, url: publicUrl }, error: null };
  },

  deleteImage: async (filePath, bucket = 'properties') => {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);
    return { error };
  },
};
